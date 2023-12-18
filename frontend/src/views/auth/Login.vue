<template>
  <div class="mt-[70px]">
    <LoadingSpinner v-if="getLoading" />
    <div v-if="getErrorMessage" class="toast toast-top toast-center mt-[50px]">
      <div class="alert text-white alert-error">
        <span>{{ getErrorMessage }}</span>
      </div>
    </div>
    <div class="w-[300px] flex flex-col items-center m-auto">
      <h2 class="text-center text-3xl p-4">Login</h2>
      <input
        type="text"
        placeholder="Enter your email or username"
        class="input input-bordered w-full max-w-xs m-3"
        v-model="loginIdentifier"
      />
      <input
        type="password"
        placeholder="Enter your password"
        class="input input-bordered w-full max-w-xs m-3"
        v-model="password"
      />
      <button class="btn btn-neutral" @click="login">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  import { useAuthStore } from '@/stores/auth'

  import LoadingSpinner from '@/components/LoadingSpinner.vue'

  const router = useRouter()

  const authStore = useAuthStore()

  const { loginUser, getLoginSuccess, getErrorMessage, getLoading } = authStore

  const loginIdentifier = ref('')
  const password = ref('')

  const login = async () => {
    await loginUser({
      loginIdentifier: loginIdentifier.value,
      password: password.value,
    })

    if (getLoginSuccess?.value) {
      router.push('/user')
    }
  }
</script>
