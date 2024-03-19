<script setup>
import { useRouter } from 'vue-router'
import { useServer } from '@/composables/server.js'
import {reactive, ref} from 'vue'
import {useSetupStore} from "@/stores/setupStore.js";
import {useAuthenticationStore} from "@/stores/authenticationStore.js";

const auth = useAuthenticationStore();
const router = useRouter()
const server = useServer()
const errorsValues = ref([])
const content = reactive({
  username: 'tutor',
  email: 'tutor@email.com',
  accountType: 'tutor',
  password: 'password',
  confirm_password: 'password'
})


async function register() {
  try {
    let reponce = await server.post('/api/register', { ...content });
    let user = reponce.data.data.user
    let token = reponce.data.data.token

    auth.$patch({token:token, user:user})

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    await router.push({name: 'home'})
  } catch (err) {
    errorsValues.value = err.response.data.errors;
  }
}

</script>

<template>
  <div class="flex w-[100vw] h-[100vh] items-center justify-center">
    <div class="bg-white shadow-md h-fit w-[500px] rounded">
      <h1 class="font-semibold p-[10px] text-gray-700">Register</h1>
      <form>
        <div class="px-[60px]">
          <div class="input-group">
            <label>Username</label>
            <input type="text" placeholder="Username" v-model="content.username" />
            <p v-if="errorsValues.username" class="text-red-400 text-right text-sm">{{errorsValues?.username[0]}}</p>
          </div>
          <div class="input-group">
            <label>Email</label>
            <input type="email" placeholder="Email" v-model="content.email" />
            <p v-if="errorsValues.email" class="text-red-400 text-right text-sm">{{errorsValues?.email[0]}}</p>
          </div>
          <div class="input-group">
            <label>Account Type</label>
            <select v-model="content.accountType">
              <option value="" selected></option>
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
            </select>
            <p v-if="errorsValues.accountType" class="text-red-400 text-right text-sm">{{errorsValues?.accountType[0]}}</p>
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" placeholder="Password" v-model="content.password" />
            <p v-if="errorsValues.password" class="text-red-400 text-right text-sm">{{errorsValues?.password[0]}}</p>
          </div>
          <div class="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Password" v-model="content.confirm_password" />
            <p v-if="errorsValues.confirm_password" class="text-red-400 text-right text-sm">{{errorsValues?.confirm_password[0]}}</p>
          </div>
        </div>
        <div class="flex items-center justify-around py-[20px]">
          <button @click.prevent="register">Register</button>
          <button @click.prevent="router.push({ name: 'home' })">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import 'src/assets/scss/index.scss';

h1 {
  @apply mb-[10px] p-[20px];
}

label {
  @apply font-semibold;
}

.input-group {
  @apply flex flex-col mb-[20px];

  input,
  select {
    border: none !important;
    @apply bg-gray-300 rounded h-[30px] py-[3px] px-[10px] outline-blue-400 focus:bg-white focus:text-gray-600 transition-all duration-300;
  }
}
</style>
