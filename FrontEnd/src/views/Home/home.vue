<script setup>
import Navigation from "@/components/navigation.vue";
import CourseCategories from "@/components/CourseCategories.vue";
import CourseListing from "@/components/CourseListing.vue";
import {ref} from "vue";
import {useServer} from "@/composables/server.js";

const courses = ref([])
const server = useServer()

server.get('/api/courses')
    .then((resp) => {
      courses.value = resp.data
    }).catch((err) => {
  console.log(err)
})
</script>

<template>
  <navigation class=" mb-[20px]"></navigation>

  <div class="container h-[250px] rounded-md bg-red-400 mb-[20px]">
  </div>

  <div class="flex container px-[0px] gap-2 flex-wrap" >
    <div class="bg-white shadow-sm h-[50px] rounded w-[100%]"></div>
    <course-categories></course-categories>
    <course-listing :courses="courses"></course-listing>
  </div>

</template>

<style>
@import 'src/assets/scss/index.scss';
body{
  overflow: auto !important;
  background-color: #fafafa;
}
</style>
