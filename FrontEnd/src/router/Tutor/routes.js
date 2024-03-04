import Dashboard from "@/views/Dashboard/Tutor/Dashboard.vue";
import Courses from "@/views/Dashboard/Tutor/Courses.vue";
import CreateCourses from "@/views/Dashboard/Tutor/CreateCourses.vue";
import CourseDetails from "@/views/Dashboard/Tutor/Components/CourseDetails.vue";
import ModuleDetails from "@/views/Dashboard/Tutor/Components/ModuleDetails.vue";
import CourseSettings from "@/views/Dashboard/Tutor/Components/CourseSettings.vue";
import ModuleList from "@/views/Dashboard/Tutor/Components/ModuleList.vue";
import EditCourse from "@/views/Dashboard/Tutor/EditCourse.vue";
const authentication = false

const TutorRoutes = [
    {
        path: '/Tutor/dashboard',
        name: 'TutorDashboard',
        component: Dashboard,
        meta: {
            requiresAuth: authentication,
        },

    },

    {
        path: '/Tutor/Courses',
        name: 'TutorCourses',
        component: Courses,
        meta: {
            requiresAuth: authentication,
        }
    },

    {
        path: '/Tutor/Courses/Create',
        component: CreateCourses,
        meta: {
            requiresAuth: authentication,
        },
        children:[
            {
                path:'',
                name: 'TutorCreateCourse',
                component:CourseDetails
            },
            {
                path:'module-list',
                name: 'ModuleList',
                component:ModuleList
            },
            {
                path:'module-details',
                children:[
                    {
                        path:'',
                        name: 'ModuleDetails',
                        component:ModuleDetails
                    },
                    {
                        path:'details/:id',
                        name: 'EditModuleDetails',
                        component:ModuleDetails
                    }
                ]
            },
            {
                path:'course-settings',
                name: 'CourseSettings',
                component:CourseSettings
            }
        ]
    },

    {
        path: '/Tutor/Courses/Edit/:id',
        component: EditCourse,
        meta: {
            requiresAuth: authentication,
        },
        children:[
            {
                path:'',
                name: 'TutorEditCourse',
                component:CourseDetails
            },
            {
                path:'module-details',
                children:[
                    {
                        path:'',
                        name: 'EditCreatedModuleDetails',
                        component:ModuleDetails
                    },
                    {
                        path:'details',
                        name: 'EditCreatedModuleList',
                        component:ModuleDetails
                    }
                ]
            },
            {
                path:'module-list',
                name: 'EditModuleList',
                component:ModuleList
            },
            {
                path:'course-settings',
                name: 'EditCourseSettings',
                component:CourseSettings
            }
        ]
    },
]

export {TutorRoutes}


// {
//     path: '/creator/pages',
//         name: 'CreatorPages',
//     component: Pages,
//     meta: {
//     requiresAuth: true,
//         creatorGuard: true
// }
// },