<script setup>
import { useRouter } from 'vue-router'
import {useServer} from "@/composables/server.js";
import {reactive, ref} from "vue";
import {useAuthenticationStore} from "@/stores/authenticationStore.js";

const router = useRouter()
const server = useServer()
const auth = useAuthenticationStore()


const errorsValues = ref({})
const content = reactive({
  email:'',
  password:''
})

async function login() {
  try{
    const response =  await server.post('/api/login', {... content })
    const { token, user } = response.data;

    auth.$patch({token:token, user:user})

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    await router.push({name: 'home'})
  }catch (errors){
    errorsValues.value = errors?.response?.data?.errors
  }
}
function register() {
  router.push({ name: 'register' })
}

</script>

<template>
  <div class="flex w-[100vw] h-[100vh] bg-gray-600 items-center justify-center">
    <div class="bg-white shadow-md h-fit w-[500px] rounded">
      <h1 class="font-semibold p-[10px] text-gray-700">Sign In</h1>
      <form>
        <div class="px-[60px]">
          <div class="input-group">
            <label>username</label>
            <input type="email" placeholder="email" v-model="content.email"/>
            <p v-if="errorsValues.email" class="text-red-400 text-right text-sm">{{errorsValues?.email[0]}}</p>
          </div>
          <div class="input-group">
            <label>Password</label>
            <input type="password" placeholder="Password" v-model="content.password"/>
            <p v-if="errorsValues.password" class="text-red-400 text-right text-sm">{{errorsValues?.password[0]}}</p>
          </div>
        </div>
        <div class="flex items-center justify-around py-[20px]">
          <button @click.prevent="login" type="submit">Sign In</button>
          <button @click.prevent="register" type="submit">Register</button>
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

  input {
    border: none !important;
    @apply bg-gray-300 rounded h-[30px] py-[5px] px-[10px] outline-blue-400 focus:bg-white focus:text-gray-600 transition-all duration-300;
  }
}
</style>