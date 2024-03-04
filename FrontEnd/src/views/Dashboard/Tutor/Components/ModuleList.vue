<script setup>

import {useRoute} from "vue-router";

const route = useRoute()
const props = defineProps(['course'])

function removeItem(idx) {
  // Assuming props.course.modules is the array from which you want to remove the item
  // Make sure idx is within the valid range of the array
  if (idx >= 0 && idx < props.course.modules.length) {
    // Splice the array at the specified index to remove one item
    props.course.modules.splice(idx, 1);
  } else {
    console.error('Invalid index:', idx);
  }
}


</script>

<template>
  <div class="flex justify-end mb-[10px]">
    <router-link :to="{name:'ModuleDetails'}" class="block px-[20px] py-[3px] bg-blue-500 text-white rounded">Add</router-link>
  </div>
  <ul>
    <router-link :to="{name:'EditModuleDetails', params:{id:index}}" v-for="(item,index) in props.course.modules" class="border bg-white mb-[8px] flex py-[5px] px-[5px]">
      <h1 class="overflow-ellipsis w-[100%] line-clamp-1">Module {{index+1}} : {{item.title}} </h1>
      <div class="w-[200px] flex items-center justify-end space-x-2">
        <button class="bg-blue-300 text-white rounded px-[5px] py-[1px] text-sm">Edit</button>
        <button class="bg-red-400 text-white rounded px-[5px] py-[1px] text-sm" @click.prevent="removeItem(index)">Delete</button>
      </div>
    </router-link>
  </ul>
</template>

<style scoped lang="scss">
@import "src/assets/scss/index.scss";

a{
  &:hover{
    cursor: pointer;
    background-color: dodgerblue !important;
    color: white;
  }
}
</style>