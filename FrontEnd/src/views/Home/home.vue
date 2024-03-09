<script setup>
import Navigation from "@/components/navigation.vue";
import CourseCategories from "@/components/CourseCategories.vue";
import CourseListing from "@/components/CourseListing.vue";
import {ref} from "vue";
import {useServer} from "@/composables/server.js";

const courses = ref([])
const server = useServer()

server.get('/api/courses')
    .then((resp) => courses.value = resp.data)
    .catch((err) => console.log(err))


</script>

<template>
  <navigation class="mb-3"></navigation>

  <div class="container h-[250px] rounded-md bg-red-400 mb-[20px]">
  </div>

  <div class="container flex p-0 gap-2 flex-wrap">
    <div class="bg-white shadow-sm h-[50px] rounded w-full"></div>
    <course-categories class="w-[19%]"></course-categories>
    <course-listing :courses="courses"></course-listing>
  </div>

</template>

<style>
body {
  overflow: auto !important;
}
</style>
