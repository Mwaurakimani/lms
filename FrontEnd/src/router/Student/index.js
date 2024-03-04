import Courses from "@/views/Dashboard/Tutor/Courses.vue";
import CreateCourses from "@/views/Dashboard/Tutor/CreateCourses.vue";
import CourseDetails from "@/views/Dashboard/Tutor/Components/CourseDetails.vue";
import ModuleDetails from "@/views/Dashboard/Tutor/Components/ModuleDetails.vue";
import CourseSettings from "@/views/Dashboard/Tutor/Components/CourseSettings.vue";
import ModuleList from "@/views/Dashboard/Tutor/Components/ModuleList.vue";
import EditCourse from "@/views/Dashboard/Tutor/EditCourse.vue";
import Dashboard from "@/views/Dashboard/Student/Dashboard.vue";
import CourseDashboard from "@/views/Dashboard/Student/CourseDashboard.vue";
const authentication = false

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