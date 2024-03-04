<script setup>
</script>

<template>
  <div class="flex space-x-2 w-[100%] h-[100%]">
    <div class="course-outline w-[250px] h-[100vh] bg-gray-200">
      <h1 class=" p-[10px] mb-[10px] text-[25px]">Course Title</h1>
      <ul>
        <li class="active">Module 1:title</li>
        <li>Module 1:title</li>
        <li>Module 1:title</li>
        <li>Module 1:title</li>
        <li>Module 1:title</li>
        <li>Module 1:title</li>
        <li>Module 1:title</li>
        <li>Module 1:title</li>
      </ul>
    </div>
    <div class="course-display w-[calc(100%-250px)] h-[100vh] overflow-auto">
      <div style="position:sticky; top: 1px" class="bg-gray-50 flex justify-between items-center">
        <h2 class="p-[20px] text-[25px] font-light ">Module 1: Title</h2>
        <router-link class="mx-[20px] bg-blue-600 text-white rounded-sm px-[10px] py-[5px]"
                     :to="{name:'StudentCourses'}">Courses
        </router-link>
      </div>
      <div class="p-[20px] flex items-center justify-center w-[100%]">
        <div class="h-[500px] w-[100%] rounded-sm bg-gray-700 overflow-hidden">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/oJuGlqO85YI?si=WsVQZ4kHtCVooxtb"
                  title="YouTube video player" frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen></iframe>
        </div>
      </div>
      <div class="px-[20px] flex justify-between">
        <button class="btn bg-blue-600 text-white hover:bg-blue-800 rounded-sm py-[5px] px-[10px]">Previous</button>
        <button class="btn bg-blue-600 text-white hover:bg-blue-800 rounded-sm py-[5px] px-[10px]">Next</button>
      </div>
      <h3 class="p-[20px] underline">Module Description</h3>
      <ul class="px-[40px] list-disc">
        <li class="mb-[10px] text-sm max-w-[800px]"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Accusantium at culpa, dolor eaque earum esse hic in labore laborum libero magnam nesciunt numquam possimus sed
          suscipit tenetur velit. Porro, quisquam?</p></li>
      </ul>

    </div>
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

<style lang="scss">
body, html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
