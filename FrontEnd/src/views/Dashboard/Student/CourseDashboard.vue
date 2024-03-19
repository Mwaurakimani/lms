<script setup>
import {useServer} from "@/composables/server.js";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import Module from "@/views/Dashboard/Student/Module.vue";

const server = useServer()
const router = useRouter()
const route = useRoute()
const course = ref(null)
const active_module = ref(null)

server.get('/api/student/course/'+route.params.id)
.then((resp) => {
  course.value = resp?.data
  active_module.value = route?.query?.module
})
.catch((error) => {
  console.log(error)
})


</script>

<template>
  <div class="flex space-x-2 w-[100%] h-[100%]">
    <div class="course-outline w-[250px] h-[100vh] bg-gray-200">
      <h1 class=" p-[10px] mb-[10px] text-[25px]">Course Title</h1>
      <ul class="flex-column flex" v-if="course?.modules?.length > 0">
        <li
            class="text-ellipsis"
            :class="[module.id === active_module ? 'active' : '']"
            v-for="module in course.modules"
            @click="router.push({ name: 'StartCourse', params: { id: course.id }, query: { module: module.id,_r: Date.now() } })"
            :key="module.id">
          {{module.title}}</li>
      </ul>
    </div>
    <Module :course="course" :key="Date.now()"/>
  </div>
</template>

<style scoped lang="scss">
.course-outline {
  overflow: auto;

  ul {
    li {
      @apply py-[10px] px-[10px]
    }

    .active {
      @apply border-l-blue-500 border-l-[5px] bg-white
    }
  }
}

</style>

<style lang="scss" scoped>
li,a{
  @apply py-[20px] flex items-center
}
</style>
