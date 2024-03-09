<script setup>
import {ref} from "vue";

const categories = ref([
  "Generative AI",
  "Data Analysis",
  "Coaching Courses",
  "Marketing",
  "Business Management",
  "Money & Finance",
  "Trading",
  "Business Administration"
])

</script>


<template>
  <div class="course-category bg-white shadow-sm rounded">
    <h1 class="p-[10px] font-semibold text-gray-700">Course Categories</h1>
    <ul class="px-[10px]">
      <li v-for="item in categories">{{item}}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.course-category {

  li {
    cursor: pointer;
    @apply p-[8px] bg-gray-100 mb-[5px] rounded text-sm
    hover:bg-blue-400 hover:text-white;

  }

}
</style>