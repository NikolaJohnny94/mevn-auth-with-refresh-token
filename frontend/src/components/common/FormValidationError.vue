<template>
  <span class="text-red-500">{{ message }}</span>
</template>

<script setup lang="ts">
  defineProps<{ message: string }>()
</script>
