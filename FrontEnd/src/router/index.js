import {createRouter, createWebHistory} from 'vue-router'
import register from "@/views/Home/register.vue"
import home from "@/views/Home/home.vue"
import CourseDescription from "@/views/Home/CourseDescription.vue";
import {TutorRoutes} from "@/router/Tutor/routes.js";
import {StudentsRoutes} from "@/router/Student/index.js";
import signIn from "@/views/Home/signIn.vue";
import {useAuthenticationStore} from "@/stores/authenticationStore.js";
import {useServer} from "@/composables/server.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            beforeEnter: (to, from) => {
                const authStore = useAuthenticationStore()
                let authenticated = authStore.is_authenticated
            }
        },
        {
            path: '/course/:id',
            name: 'CourseDescription',
            component: CourseDescription
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/login',
            name: 'login',
            component: signIn
        },
        ...TutorRoutes,
        ...StudentsRoutes
    ]
})


// authenticated guard
router.beforeEach(async (to, from, next) => {
    const authStore = useAuthenticationStore()
    let authenticated = authStore.is_authenticated

    if (to.meta.requiresAuth === true) {
        const server = useServer()

        try {
            authenticated = await authStore.a_is_Authenticated(server)
        } catch (e) {
            next({name: 'login'});
        }

        if (!authenticated)
            next({name: 'login'});
        else
            next()

    } else if ((to.name === 'login' || to.name === 'register') && authenticated) {
        next({name: 'home'});
    } else {
        next();
    }
});

// //account type guard
// router.beforeEach(async (to, from, next) => {
//   const authenticated = await is_Authenticated();
//   const user = JSON.parse(localStorage.getItem('user'));
//
//   if (to.meta.marketerGuard && user.accountType !== 'marketer') {
//     next({ name: 'home' });
//   }  else if (to.meta.creatorGuard &&  user.accountType !== 'creator') {
//     next({ name: 'home' });
//   } else if (to.meta.adminGuard &&  user.accountType !== 'admin') {
//     next({ name: 'home' });
//   }
//
//   next();
// });

export default router
