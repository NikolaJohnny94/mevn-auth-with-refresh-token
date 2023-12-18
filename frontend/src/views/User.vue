<template>
  <div class="mt-12">
    <LoadingSpinner v-if="getLoading" />
    <h1 class="text-center text-3xl">
      Welcome: <strong>{{ getUser?.email }}</strong>
    </h1>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'

  import { useAuthStore } from '@/stores/auth'

  import LoadingSpinner from '@/components/LoadingSpinner.vue'

  const authStore = useAuthStore()
  const router = useRouter()

  const { getUser, getLoading, getLoggedUser } = authStore

  const { errorMessage } = storeToRefs(authStore)

  getLoggedUser()

  watch(errorMessage, () => router.push('/login'))
</script>
