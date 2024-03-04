<script setup>
import TutorDashboard from "@/components/TutorDashboard.vue";
import StudentDashboard from "@/components/StudentDashboard.vue";
import {ref} from "vue";
import {useServer} from "@/composables/server.js";

const boundAccount = JSON.parse(localStorage.getItem('user')).accountType

const comp = boundAccount === 'student' ? TutorDashboard : StudentDashboard

const courses = ref([])
const server = useServer()

if(boundAccount === 'student'){
  server.get('/api/courses/enrolled')
      .then((resp) => {
        courses.value = resp.data
      }).catch((err) => {
    console.log(err)
  })
}else {
  server.get('/api/courses')
      .then((resp) => {
        courses.value = resp.data
      }).catch((err) => {
    console.log(err)
  })
}

</script>

<template>
  <component :is="comp" :page-title="'Courses'">
    <div class="flex justify-between items-center">
      <h1 class="p-[20px] text-[25px] font-semibold text-gray-700">My Courses</h1>
      <router-link :to="{name:'TutorCreateCourse'}" class="mr-[10px] px-[8px] py-[5px] rounded bg-blue-500 text-white">
        Add Course
      </router-link>
    </div>
    <div class="max-w-[900px] mx-auto h-[300px]">
      <ul class="flex p-0 border-b mb-[20px]">
        <li class="active">Current Courses</li>
        <li>Completed Courses</li>
      </ul>
      <section>
        <ul>
          <li class="course-bar" v-for="course in courses">
            <div class="flex gap-[100px] p-[8px]">
              <div>
                <h2 class="mb-[10px]">{{course.title}}</h2>
                <p class="font-normal text-sm line-clamp-3">{{course.description}}</p>
              </div>
              <div class="w-[400px] flex space-x-2 h-[100px] items-center">
                <router-link v-if="boundAccount=='tutor'" :to="{name:'TutorEditCourse',params:{id:course.id}}">Edit
                </router-link>
                <router-link v-if="boundAccount=='student'" :to="{name:'StartCourse',params:{id:course.id}}">Continue
                </router-link>
                <button v-if="boundAccount=='tutor'">Delete</button>
              </div>
            </div>
            <div v-if="boundAccount=='student'" class="h-[60px] bg-gray-100 flex flex-col"
                 style="align-items: center; justify-content: center">
              <div class="w-[95%] mx-auto">
                <div class="w-[80%] bg-gray-200 h-[10px] rounded-lg">
                  <div class="w-[99%] bg-green-400 h-[10px] rounded-lg">

                  </div>
                </div>
              </div>
              <div class="w-[95%] mx-auto">3%</div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </component>
</template>

<style scoped lang="scss">
:root {
  div {
    ul {
      li {
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

li.active {
  border-bottom: 2px solid blue;
}

.course-bar {
  width: 100%;
  border: 1px solid #bebcbc;
  overflow: hidden;
  @apply rounded mb-[10px] p-0 bg-white;

  a, button {
    @apply px-[10px] py-[8px] block font-normal bg-blue-500 text-white rounded
  }
}
</style>
