<script setup>
import StudentDashboard from "@/components/StudentDashboard.vue";
import {useRouter} from "vue-router";
const router = useRouter()
router.push({name:"StudentCourses"})
</script>

<template>
  <StudentDashboard :page-title="'Student'">
  </StudentDashboard>
</template>
