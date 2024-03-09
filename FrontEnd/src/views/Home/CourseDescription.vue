<script setup>
import Navigation from "@/components/navigation.vue";
import {ref} from "vue";
import {useServer} from "@/composables/server.js";
import {useRoute, useRouter} from "vue-router";
import dateFormatter from "../../composables/dateFormatter.js";

const accountType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accountType : null

const router = useRouter()
const course = ref([])
const server = useServer()
const route = useRoute()

server.get('/api/course/' + route.params.id)
    .then((resp) => {
      course.value = resp.data
    }).catch((err) => {
  console.log(err)
})

function enroll() {
  server.get('/api/enroll/' + route.params.id)
      .then((resp) => {
        router.push({name:'StudentCourses'})
      }).catch((err) => {
    console.log(err)
  })
}

</script>

<template>
  <navigation class=" mb-[20px]"></navigation>

  <div class="container h-[250px] rounded-md bg-red-400 mb-[20px] p-0 overflow-hidden">
    <img
        :src="course.image?'http://localhost:8001/storage'+course.image:'#'"
        class="w-full h-full max"
        style="object-position: center;object-fit: cover"
    >
  </div>

  <div class="flex container px-[0px] gap-2 mb-[10px] flex-wrap">
    <div class="description w-[70%] px-[10px] mb-[20px]">
      <h1 class="mb-[10px] py-[10px] font-semibold text-gray-700">{{ course.title }}</h1>
      <div class="text-sm text-justify mb-[20px]">
        <p>{{ course.description }}</p>
      </div>
      <h1 class="mb-[10px] py-[10px] font-semibold text-gray-700">Course Oultline</h1>
      <ul class="text-sm">
        <li class="flex justify-between mb-[10px]" v-for="item in course.modules">
          <h3>{{item.title}}</h3>
          <p class="w-[100px]">{{item.time}}</p>
        </li>
      </ul>
    </div>

    <div class="w-[29%]">
      <div class="author px-[10px] pb-[10px]">
        <h1 class="mb-[10px] py-[10px] font-semibold text-gray-700">Course Stats</h1>
        <ul class="px-[10px]">
          <li class="flex items-center justify-between mb-[10px] text-sm">
            <h6>Date Created :</h6>
            <p>{{ dateFormatter(course.created_at) }}</p>
          </li>
          <li class="flex items-center justify-between mb-[10px] text-sm">
            <h6>Last Update :</h6>
            <p>{{ dateFormatter(course.updated_at) }}</p>
          </li>
          <li class="flex items-center justify-between mb-[10px] text-sm">
            <!--            <h6>Course Rating :</h6>-->
            <!--            <rating></rating>-->
          </li>
          <!--          <li class="flex items-center justify-between mb-[10px] text-sm">-->
          <!--            <h6>Students Enrolled :</h6>-->
          <!--            <p>3,000 Students</p>-->
          <!--          </li>-->
          <li class="flex items-center justify-between mb-[10px] text-sm">
            <h6>Status</h6>
            <p>{{ course.status }}</p>
          </li>
        </ul>
      </div>
    </div>


  </div>

  <div class="mb-[20px] flex items-center justify-center w-[100%]">
    <button v-if="accountType === 'student'" class="bg-blue-500 text-white px-[80px] py-[5px] block rounded-sm"
            @click.prevent="enroll">Enroll
    </button>
  </div>
</template>

<style scoped>
@import "src/assets/scss/index.scss";

.description, .author {
  @include app-card;
  @apply bg-white rounded shadow;
}
</style>