<script setup>

</script>

<template>
  <div class="course-category bg-white shadow-sm h-[300px] rounded w-[19%]">
    <h1 class="p-[10px] font-semibold text-gray-700">Course Categories</h1>
    <ul class="px-[10px]">
      <li>Generative AI</li>
      <li>Data Analysis</li>
      <li>Coaching Courses</li>
      <li>Marketing</li>
      <li>Business Management</li>
      <li>Money & Finance</li>
      <li>Trading</li>
      <li>Business Administration</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.course-category{
  li{
    @apply p-[8px] bg-gray-100 mb-[5px] rounded text-sm
    hover:bg-blue-400 hover:text-white;
  }
}
</style>