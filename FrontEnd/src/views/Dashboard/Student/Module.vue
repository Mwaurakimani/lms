<script setup>
import {useRoute} from "vue-router";
import {useServer} from "@/composables/server.js";
import {ref} from "vue";

const route = useRoute()
const props = defineProps(['course'])
const server = useServer()
const module = ref(route?.query?.module)
const moduleData = ref(null)

if (module.value != null){
  server.get('/api/module/'+module.value)
      .then((resp) => {
        moduleData.value = resp.data[0]
      })
      .catch((err) => console.log(err))
} else{
  console.log("hi")
}

</script>
<template>
  <div v-if="moduleData" class="course-display w-[calc(100%-250px)] h-[100vh] overflow-auto">
    <div style="position:sticky; top: 1px" class="bg-gray-50 flex justify-between items-center">
      <h2 class="p-[20px] text-[25px] font-light ">{{moduleData.title}}</h2>
      <router-link class="mx-[20px] bg-blue-600 text-white rounded-sm px-[10px] py-[5px]"
                   :to="{name:'StudentCourses'}">Courses
      </router-link>
    </div>
    <div class="p-[20px] flex items-center justify-center w-[100%]">
      <div class="h-[500px] w-[100%] rounded-sm bg-gray-700 overflow-hidden">
                  <iframe width="100%" height="100%" :src="moduleData.video"
                          title="YouTube video player" frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen></iframe>
      </div>
    </div>
    <div class="px-[20px] flex justify-between">
    </div>
    <h3 class="p-[20px] underline">Module Description</h3>
    <ul class="px-[40px] list-disc">
      <li class="mb-[10px] text-sm max-w-[800px]"><p>{{moduleData.description}}</p></li>
    </ul>

  </div>
</template>
