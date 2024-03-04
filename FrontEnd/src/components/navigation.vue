<script setup>

import {is_Authenticated} from "@/composables/Authentication.js";
import {useServer} from "@/composables/server.js";
import {useRouter} from "vue-router";

const accountType = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).accountType : null

const server = useServer()
const router = useRouter();


function logout() {
  server.post('/api/logout')
      .then(() => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = window.location.href
      })
}

</script>
<template>
  <div class="container nav-bar shadow rounded-md flex items-center justify-between mt-[10px]">
    <div class="logo w-[100px]">
      <div class="font-bold flex items-center justify-center h-[100%] text-[30px] text-blue-500">LMS</div>
    </div>

    <ul v-if="accountType == null">
      <li>
        <router-link class="navigation-link" :to="{name:'register'}">Register</router-link>
      </li>
      <li>
        <router-link class="navigation-link" :to="{name:'login'}">Sign In</router-link>
      </li>
    </ul>
    <ul v-else>
      <li v-if="accountType === 'tutor'">
        <router-link class="navigation-link" :to="{name:'TutorDashboard'}">Dashboard</router-link>
      </li>
      <li v-else-if="accountType === 'student'">
        <router-link class="navigation-link" :to="{name:'TutorDashboard'}">Dashboard</router-link>
      </li>
      <li v-else>
        <router-link class="navigation-link" :to="{name:'StudentCourses'}">Dashboard</router-link>
      </li>
      <li>
        <button class="logout" @click.prevent="logout">Log Out</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import 'src/assets/scss/index.scss';

.nav-bar {
  background-color: white;
  @apply py-[5px];

  .logo {
    width: 100px;
    height: 50px;
    @apply rounded
  }

  ul {
    @apply flex;

    li {
      transition: all ease-in 100ms;
      @apply flex items-center justify-center px-[10px] py-[4px] rounded  mx-[5px] text-gray-700 font-semibold hover:text-white hover:bg-blue-400;

      &.active {
        @apply bg-blue-500 text-gray-50
      }
    }
  }
}
</style>