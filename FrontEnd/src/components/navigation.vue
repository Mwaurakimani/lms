<script setup>
import {useServer} from "@/composables/server.js";
import {useAuthenticationStore} from "@/stores/authenticationStore.js";
import {useRouter} from "vue-router";

const auth = useAuthenticationStore()
const router = useRouter()
const server = useServer()

async function logout() {
  try {
    await auth.logOut(server)
    await router.go()
  } catch (err) {
    console.log(err)
  }
}
</script>
<template>
  <div class="container nav-bar">
    <div class="logo">
      <div class="flex items-center justify-center h-[100%] text-[30px] font-bold text-blue-500">LMS</div>
    </div>

    <div v-if="auth.accountType == null">
      <router-link :to="{name:'register'}" class="navigation-link">Register</router-link>
      <router-link class="navigation-link" :to="{name:'login'}">Sign In</router-link>
    </div>
    <div v-else>
      <router-link v-if="auth.accountType === 'tutor'" class="navigation-link" :to="{name:'TutorDashboard'}">
        Dashboard
      </router-link>
      <router-link v-else-if="auth.accountType === 'student'" class="navigation-link" :to="{name:'StudentDashboard'}">
        Dashboard
      </router-link>
      <router-link v-else class="navigation-link" :to="{name:'StudentCourses'}">Dashboard</router-link>
      <button class="logout" @click.prevent="logout">Log Out</button>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  @apply flex items-center justify-between py-[5px] mt-[10px] bg-white shadow rounded-md;

  .logo {
    @apply rounded w-[100px] h-[50px]
  }

  div {
    @apply flex;

    a, button {
      transition: all ease-in 100ms;
      @apply flex items-center justify-center px-[10px] py-[4px] mx-[5px] text-gray-700 rounded font-semibold
      hover:text-white hover:bg-blue-400;

      &.active {
        @apply bg-blue-500 text-gray-50
      }
    }
  }
}
</style>