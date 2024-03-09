<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const props = defineProps(['course'])

</script>


<template>
  <li class="w-[24%] bg-white rounded overflow-hidden border" @click.prevent="router.push({name:'CourseDescription',params:{id:course.id}})">
    <div class="h-[150px]">
      <img
          :src="course.image?'http://localhost:8001/storage'+course.image:'#'"
          class="w-full h-[150px] max"
          style="object-position: center;object-fit: cover"
      >
    </div>
    <h2 class="text-sm font-semibold p-[5px]">{{course.title}}</h2>
    <p class="px-[5px] text-justify text-[12px] line-clamp-4">{{ course.description }}</p>
<!--    <div class="py-[20px] text-[12px] flex ">-->
<!--      <p class="mx-[10px] font-semibold">Enrolled:</p>-->
<!--      <p class="text-orange-400">300 Students</p>-->
<!--    </div>-->
    <div>
      <button class="px-3 py-1 bg-blue-600 text-white rounded mx-auto block mb-2">View</button>
    </div>
  </li>
</template>
<style scoped lang="scss">
li{
  transition: all ease-in 100ms;
  cursor: pointer;
}

li:hover{
  transform: scale(1.03);
}
</style>