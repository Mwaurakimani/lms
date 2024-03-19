<script setup>

import TutorDashboard from "@/components/TutorDashboard.vue";
import {provide, toRef} from "vue";
import {useCourseStore} from "@/stores/courseStore.js";
import {useRouter} from "vue-router";
import router from "@/router/index.js";

const coursesStore = useCourseStore()
const course = toRef(coursesStore.courses, 'active')
coursesStore.loadActiveCourse({
  title: "System Administration",
  description: "This is a course on System Administration",
  image: null,
  banner: null,
  modules: [],
  status: 'Active',
})


document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'Enter')
    saveCourse()
})

async function saveCourse() {
  try {
    await coursesStore.saveActiveCurse()
    await router.push({name: 'TutorCourses'})
  } catch (err) {
    console.log(err)
  }
}

let imageUpload = (file, variable, fieldName) => {
  course.value[fieldName] = file
}

provide('imageUpload', imageUpload)
</script>

<template>
  <TutorDashboard :page-title="'Courses'">
    <div class="flex justify-between items-center">
      <h1 class="p-[20px] text-[25px] font-semibold text-gray-700">Create Courses</h1>
      <button class="px-4 py-1 bg-blue-600 text-white rounded mr-1" @click.prevent="saveCourse">Save</button>
    </div>

    <div class="max-w-[900px] mx-auto h-[300px]">
      <ul class="flex p-0 border-b mb-[20px]">
        <router-link :to="{name:'TutorCreateCourse'}">Course Details</router-link>
        <router-link :to="{name:'ModuleList'}">Modules</router-link>
        <router-link :to="{name:'CourseSettings'}">Course Settings</router-link>
      </ul>
      <section>
        <router-view :course></router-view>
      </section>
    </div>
  </TutorDashboard>
</template>

<style scoped lang="scss">
:root {
  div {
    ul {
      a {
        transition: all ease-in 100ms;
        @apply px-[8px] py-[10px] font-semibold
      }
    }

    section {
      li {
        @apply p-0
      }
    }
  }
}

a.router-link-exact-active {
  border-bottom: 2px solid blue;
}

.course-bar {
  width: 100%;
  border: 1px solid #bebcbc;
  overflow: hidden;
  @apply rounded mb-[10px] p-0 bg-white;

  button {
    @apply px-[10px] py-[8px] font-normal bg-blue-500 text-white rounded
  }
}
</style>
