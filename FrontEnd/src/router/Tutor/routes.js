import Dashboard from "@/views/Dashboard/Tutor/Dashboard.vue";
import Courses from "@/views/Dashboard/Tutor/Courses.vue";
import CreateCourses from "@/views/Dashboard/Tutor/Courses/CreateCourses.vue";
import CourseDetails from "@/views/Dashboard/Tutor/Components/CourseDetails.vue";
import ModuleDetails from "@/views/Dashboard/Tutor/Components/ModuleDetails.vue";
import CourseSettings from "@/views/Dashboard/Tutor/Components/CourseSettings.vue";
import ModuleList from "@/views/Dashboard/Tutor/Components/ModuleList.vue";
import EditCourse from "@/views/Dashboard/Tutor/Courses/EditCourse.vue";
import UpdateCourse from "@/views/Dashboard/Tutor/Components/UpdateCourse.vue";

const authentication = true

const createCourseRoutes = [
    {
        path: '/Tutor/Courses/Create',
        component: CreateCourses,
        meta: {
            requiresAuth: authentication,
        },
        children: [
            {
                path: '',
                name: 'TutorCreateCourse',
                component: CourseDetails
            },
            {
                path: 'module-list',
                children: [
                    {
                        path: 'add-module',
                        name: 'ModuleDetails',
                        component: ModuleDetails
                    },
                    {
                        path: '',
                        name: 'ModuleList',
                        component: ModuleList,
                    },
                    {
                        path: 'details/:module',
                        name: 'EditModuleDetailsCreate',
                        component: ModuleDetails
                    }
                ]
            },
            {
                path: 'course-settings',
                name: 'CourseSettings',
                component: CourseSettings
            }
        ]
    }
]

const updateCourses = [
    {
        path: '/Tutor/Courses/Edit/:id',
        component: EditCourse,
        meta: {
            requiresAuth: authentication,
        },
        children: [
            {
                path: '',
                name: 'TutorEditCourse',
                component: UpdateCourse
            },
            {
                path: 'module-list',
                children: [
                    {
                        path: '',
                        name: 'EditModuleList',
                        component: ModuleList
                    },
                    {
                        path: 'module-update/:module',
                        name: 'EditModuleDetails',
                        component: ModuleDetails
                    },
                    {
                        path: 'module-add',
                        name: 'AddModuleDetails',
                        component: ModuleDetails
                    }
                ]
            },
            {
                path: 'course-settings',
                name: 'EditCourseSettings',
                component: CourseSettings
            },
        ]
    },
]

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

    ...updateCourses,

    ...createCourseRoutes
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

// {
//     path:'module-details',
//         children:[
//     {
//         path:'',
//         name: 'EditCreatedModuleDetails',
//         component:ModuleDetails
//     },
//     {
//         path:'details',
//         name: 'EditCreatedModuleList',
//         component:ModuleDetails
//     }
// ]
// },