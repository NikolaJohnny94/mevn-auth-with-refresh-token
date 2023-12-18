<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'

  import Layout from '@/layouts/index.vue'
</script>
