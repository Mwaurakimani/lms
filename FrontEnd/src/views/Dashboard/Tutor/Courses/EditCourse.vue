<script setup>
import TutorDashboard from "@/components/TutorDashboard.vue";
import {useServer} from "@/composables/server.js";
import {useRoute} from "vue-router";
import {ref} from "vue";

const server = useServer()
const route = useRoute()
const course = ref(null)

server.get('api/course/'+route.params.id)
    .then(async (resp) => {
      course.value = resp.data
    }).catch((err) => {
  console.log(err)
})

</script>

<template>
  <TutorDashboard :page-title="'Courses'">
    <div class="flex justify-between items-center">
      <h1 class="p-[20px] text-[25px] font-semibold text-gray-700">Edit Courses</h1>
    </div>
    <div class="max-w-[900px] mx-auto h-[300px]">
      <ul class="flex p-0 border-b mb-[20px]">
        <router-link :to="{name:'TutorEditCourse'}">Course Details</router-link>
        <router-link :to="{name:'EditModuleList'}">Modules</router-link>
        <router-link :to="{name:'EditCourseSettings'}">Course Settings</router-link>
      </ul>
      <section>
        <router-view v-if="course" :course='course'> </router-view>
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
