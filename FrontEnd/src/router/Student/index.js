import Courses from "@/views/Dashboard/Tutor/Courses.vue";
import Dashboard from "@/views/Dashboard/Student/Dashboard.vue";
import CourseDashboard from "@/views/Dashboard/Student/CourseDashboard.vue";
const authentication = true

const StudentsRoutes = [
  {
    path: '/Student/dashboard',
    name: 'StudentDashboard',
    component: Dashboard,
    meta: {
      requiresAuth: authentication,
    }
  },

  {
    path: '/Student/Courses',
    name: 'StudentCourses',
    component: Courses,
    meta: {
      requiresAuth: authentication,
    }
  },

  {
    path: '/Student/Courses/:id',
    name: 'StartCourse',
    component: CourseDashboard,
    meta: {
      requiresAuth: authentication,
    },
  },
]

export {StudentsRoutes}


// {
//     path: '/creator/pages',
//         name: 'CreatorPages',
//     component: Pages,
//     meta: {
//     requiresAuth: true,
//         creatorGuard: true
// }
// },