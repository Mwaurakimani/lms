<script setup>
import SideBarHeading from "@/components/SideBarHeading.vue";
import {useAuthenticationStore} from "@/stores/authenticationStore.js";
import {toRef} from "vue";

const props = defineProps(['pageTitle'])

const auth = useAuthenticationStore()
let username =toRef(auth.user.username)
</script>

<template>
  <div class="dashboard-app-holder flex gap-1">
    <div class="side-panel flex flex-column justify-content-between">
      <side-bar-heading :page-title="props.pageTitle"/>
      <ul class="text-white side-buttons-list h-full">
        <router-link :to="{name:'TutorDashboard'}">Dashboard</router-link>
        <router-link :to="{name:'TutorCourses'}">My Courses</router-link>
        <router-link :to="{name:'TutorCourses'}">Account</router-link>
      </ul>
      <p class="text-white px-[20px] mb-[20px] font-bold text-[20px] text-right"> Welcome {{username}}</p>
    </div>
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
body, html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>

<style scoped lang="scss">
.dashboard-app-holder {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .side-panel {
    width: 250px;
    height: 100%;
    @apply bg-blue-950;

    .side-buttons-list {
      a {
        display: block;
        transition: all ease-in 100ms;
        @apply bg-blue-900 mx-[10px] rounded p-[8px] mb-[10px]
        hover:bg-blue-400 cursor-pointer
      }
    }
  }

  .main-content {
    width: calc(100% - 250px - 0px);
    overflow: auto;
  }
}
</style>