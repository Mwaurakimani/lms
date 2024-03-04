<script setup>
import CourseListingHeading from "@/components/CourseListingHeading.vue";
import CourseCard from "@/components/CourseCard.vue";

const props = defineProps(['courses'])
</script>

<template>
  <div class="bg-white shadow-sm h-[500px] rounded w-[80%]">
    <course-listing-heading/>
    <ul class="flex justify-evenly flex-wrap gap-[8px] p-[5px]">
      <course-card  v-for="course in props.courses" :course="course"/>
    </ul>
  </div>
</template>