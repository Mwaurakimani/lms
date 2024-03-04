<script setup>
const props = defineProps(['course'])
</script>

<template>
  <section class="app-card p-[10px]">
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label block">Status</label>
        <select class="border rounded-sm" v-model="props.course.status">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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