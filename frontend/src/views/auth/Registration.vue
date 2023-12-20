<template>
  <div class="mt-[65px]">
    <LoadingSpinner v-if="getLoading" />
    <ErrorToast v-if="getErrorMessage" :message="getErrorMessage" />
    <RegistrationForm />
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth'
  import { LoadingSpinner, ErrorToast, RegistrationForm } from '@/components'

  const authStore = useAuthStore()
  const { getErrorMessage, getLoading } = authStore
</script>
