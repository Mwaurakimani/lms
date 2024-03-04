<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps(['course'])
const router = useRouter()
const route = useRoute()
const item = ref(null);


onBeforeMount(() => {
  item.value = route.params.id
      ? props.course.modules[route.params.id]
      : {
        title: '',
        description: '',
        file: '',
        time: ''
      }
})

function saveItem(){
  if(route.params.id){
    props.course.modules[route.params.id] = item.value
  }else {
    props.course.modules.push(item.value)
  }


  router.push({name:'ModuleList'})
}


</script>

<template>
  <section class="app-card p-[10px] mb-[10px]">
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Title</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="item.title">
        <!--        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>-->
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Description</label>
        <textarea class="form-control" id="exampleInputPassword1" v-model="item.description"></textarea>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label block">Video</label>
        <input type="file">
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Time</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="item.time">
        <!--        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>-->
      </div>
      <div>
        <button class="bg-blue-600 text-white px-[10px] py-[5px] rounded" @click.prevent="saveItem">Save</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
@import "src/assets/scss/index.scss";

.app-card {
  border: 1px solid rgba(204, 204, 204, 0.8);
  overflow: hidden;
  @apply bg-white rounded
}
</style>