<script setup>
import {inject, onMounted} from "vue";

const props = defineProps(['course'])
const imageUpload = inject('imageUpload')


//for displaying
function displayImage(file, field, callBack) {
  const fileReader = new FileReader();
  imageUpload(callBack[0], callBack[1], callBack[2])
  const preview = document.getElementById(field);
  fileReader.onload = event => {
    preview.setAttribute('src', event.currentTarget.result);
  }
  fileReader.readAsDataURL(file);
  return true
}


//for upload
function setImage(event, element_id, field) {
  let file = event.currentTarget.files[0]
  if (file)
    displayImage(file, element_id, [file, props.course, field])
}

onMounted(() => {
  if (props.course.image)
    displayImage(props.course.image, 'image-preview', 'image')

  if (props.course.banner)
    displayImage(props.course.banner, 'banner-preview', 'banner')

})
</script>

<template>
  <section class="app-card p-[10px]">
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Title</label>
        <input type="email" class="form-control" id="exampleInputEmail1" v-model="props.course.title">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Description</label>
        <textarea class="form-control" id="exampleInputPassword1" v-model="props.course.description"></textarea>
      </div>
      <div class="flex mb-3 flex-col">
        <label class="form-label block w-full">Image</label>
        <img v-show="course.image" class="max-w-[250px] max-h-[200px] m-[20px]" src="#" alt="Image" id="image-preview">
        <input type="file" @change="(event) => setImage(event,'image-preview','image')" class="block mx-[20px]">
      </div>
      <div class="flex mb-3 flex-col">
        <label class="form-label block w-full">Banner</label>
        <img v-show="course.banner" class="max-w-[250px] max-h-[200px] m-[20px]" src="#" alt="Image"
             id="banner-preview">
        <input type="file" @change="(event) => setImage(event,'banner-preview','banner')" class="block mx-[20px]">
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