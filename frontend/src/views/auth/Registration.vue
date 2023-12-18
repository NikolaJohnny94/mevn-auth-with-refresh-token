<template>
  <div class="mt-[70px]">
    <LoadingSpinner v-if="getLoading" />
    <div v-if="getErrorMessage" class="toast toast-top toast-center mt-[50px]">
      <div class="alert text-white alert-error">
        <span>{{ getErrorMessage }}</span>
      </div>
    </div>
    <div class="w-[300px] flex flex-col items-center m-auto">
      <h2 class="text-center text-3xl p-4">Registration</h2>
      <input
        type="text"
        placeholder="Enter your username"
        class="input input-bordered w-full max-w-xs m-3"
        v-model="username"
      />
      <input
        type="email"
        placeholder="Enter your email"
        class="input input-bordered w-full max-w-xs m-3"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Enter your password"
        class="input input-bordered w-full max-w-xs m-3"
        v-model="password"
      />
      <button class="btn btn-neutral" @click="registration">Submit</button>
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

  const { registerUser, getRegisterSuccess, getErrorMessage, getLoading } =
    authStore

  const username = ref('')
  const email = ref('')
  const password = ref('')

  const registration = async () => {
    await registerUser({
      username: username.value,
      email: email.value,
      password: password.value,
    })

    if (getRegisterSuccess?.value) {
      router.push('/login')
    }
  }
</script>
