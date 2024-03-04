<script setup>
import {provide, ref} from "vue";
import {useAccountModifier} from "@/stores/useAccountModifier.js";

const props = defineProps(['pageTitle'])
const accountModifier = useAccountModifier()
</script>

<template>
  <div class="dashboard-app-holder flex gap-1">
    <div class="side-panel">
      <h1 class="text-white mb-[10px] py-[10px] px-[30px] font-light text-[25px]">{{props.pageTitle}}</h1>
      <ul class="text-white side-buttons-list">
        <router-link :to="{name:'home'}">Home</router-link>
        <router-link :to="{name:'StudentCourses'}">My Courses</router-link>
        <router-link :to="{name:'StudentCourses'}">Account</router-link>
      </ul>
    </div>
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
body,html{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>

<style scoped lang="scss">
.dashboard-app-holder{
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .side-panel{
    width: 250px;
    height: 100%;
    @apply bg-blue-950;

    .side-buttons-list{
      a{
        display: block;
        transition: all ease-in 100ms;
        @apply bg-blue-900 mx-[10px] rounded p-[8px] mb-[10px]
        hover:bg-blue-400 cursor-pointer
      }
    }
  }
  .main-content{
    width: calc(100% - 250px - 0px);
    overflow: auto;
  }
}
</style>