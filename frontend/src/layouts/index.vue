<template>
  <Navbar />
  <main class="h-screen">
    <slot />
  </main>
  <Footer />
</template>

<script setup lang="ts">
  import { Navbar, Footer } from '@/components'
</script>
