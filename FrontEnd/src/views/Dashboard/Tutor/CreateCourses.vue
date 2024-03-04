<script setup>

import TutorDashboard from "@/components/TutorDashboard.vue";
import {ref} from "vue";
import {useServer} from "@/composables/server.js";
import router from "@/router/index.js";

const course = ref({
  title: 'Course 1',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at dolor, dolores eligendi eos est excepturi expedita, fuga fugit ipsa molestias nesciunt nulla perspiciatis quam rem, suscipit tempore veritatis vitae',
  image: 'pathx',
  banner: 'pathx',
  modules: [
    {
      title: "Mod:one",
      description: "Mod:one description",
      file: "link to file",
      time: "6hrs",
    },
    {
      title: "Mod:two",
      description: "Mod:two description",
      file: "link to file",
      time: "6hrs",
    }
  ],
  status: 'Active',
})
const server = useServer()

function saveCourse(){
  let formData = new FormData()

  formData.append('course',JSON.stringify(course.value))

  server.post('/api/createCourse',formData)
      .then((res) => {
        console.log(res.data)
        router.push({name:'TutorCourses'})
      })
      .catch((err) => {
        console.log(err.data)
      })
}

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
        <router-view :course='course'></router-view>
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
