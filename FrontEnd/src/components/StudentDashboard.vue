<script setup>
import SideBarHeading from "@/components/SideBarHeading.vue";

const props = defineProps(['pageTitle'])
</script>

<template>
  <div class="dashboard-app-holder flex gap-1">
    <div class="side-panel">
      <side-bar-heading :page-title="props.pageTitle"/>
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