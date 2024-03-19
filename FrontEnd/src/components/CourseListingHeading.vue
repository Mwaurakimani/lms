<template>
  <div class="flex justify-between p-[10px] border-b mb-[10px]">
    <div class="flex">
      <p class="mx-[10px]">Search:</p>
      <ul>
        <li>Life Coaching</li>
      </ul>
    </div>
    <div class="flex">
      <p class="mx-[10px]">Filters:</p>
      <ul class="flex">
        <li>Life Coaching</li>
        <li>Life Coaching</li>
        <li>Life Coaching</li>
        <li>Life Coaching</li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import 'src/assets/scss/index.scss';

:root {
  div {
    ul {
      li {
        @include app-card;
      }
    }
  }
}
</style>