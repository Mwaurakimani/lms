<script setup>
const props = defineProps(['course'])
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
        <textarea class="form-control" id="exampleInputPassword1" v-model="props.course.description" ></textarea>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label block">Image</label>
        <input type="file">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label block">Banner</label>
        <input type="file">
      </div>
    </form>
  </section>
</template>

<style scoped>
@import "src/assets/scss/index.scss";

.app-card{
  border: 1px solid rgba(204, 204, 204, 0.8);
  overflow: hidden;
  @apply bg-white rounded
}
</style>