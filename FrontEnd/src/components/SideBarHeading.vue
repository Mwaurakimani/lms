<script setup>
const props = defineProps(['pageTitle'])
</script>
<template>
  <div class="flex items-center justify-between px-[10px] mb-[20px] py-[10px]">
    <h1 class="text-white font-light text-[25px]">{{ props.pageTitle }}</h1>
    <router-link :to="{name:'home'}" class="text-white">
      <i class="bi bi-house-door-fill text-[25px]"></i>
    </router-link>
  </div>
</template>
