<template>
  <div class="toast toast-top toast-center mt-[50px]">
    <div class="alert text-white alert-error">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ message: string }>()
</script>
