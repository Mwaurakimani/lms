import { createRouter, createWebHistory } from 'vue-router'
import {is_Authenticated} from "@/composables/Authentication.js";
import register from "@/views/Home/register.vue"
import home from "@/views/Home/home.vue"
import CourseDescription from "@/views/Home/CourseDescription.vue";
import {TutorRoutes} from "@/router/Tutor/routes.js";
import {StudentsRoutes} from "@/router/Student/index.js";
import signin from "@/views/Home/signin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
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
      component: signin
    },
      ...TutorRoutes,
      ...StudentsRoutes
  ]
})


router.beforeEach(async (to, from, next) => {

  const authenticated = await is_Authenticated(true);

  if (to.meta.requiresAuth && !authenticated) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && authenticated){
    next({ name: 'home' });
  } else {
    next();
  }

});

router.beforeEach(async (to, from, next) => {
  const authenticated = await is_Authenticated();
  const user = JSON.parse(localStorage.getItem('user'));

  if (to.meta.marketerGuard && user.accountType !== 'marketer') {
    next({ name: 'home' });
  }  else if (to.meta.creatorGuard &&  user.accountType !== 'creator') {
    next({ name: 'home' });
  } else if (to.meta.adminGuard &&  user.accountType !== 'admin') {
    next({ name: 'home' });
  }

  next();
});

export default router
