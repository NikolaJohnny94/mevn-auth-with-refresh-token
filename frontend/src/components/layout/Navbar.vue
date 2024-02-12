<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <span class="btn btn-ghost text-xl">{{ getUser?.username }}</span>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li v-if="$route?.meta.hideRegistrationAndLoginSection">
          <button @click="logout">Logout</button>
        </li>
        <template v-else>
          <li>
            <RouterLink to="/login">Login</RouterLink>
          </li>
          <li>
            <RouterLink to="/registration">Registration</RouterLink>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'

  import { useAuthStore } from '@/stores/auth'

  const authStore = useAuthStore()
  const router = useRouter()

  const { getUser, logoutUser } = authStore

  const logout = async () => {
    await logoutUser()
    router.push('/login')
  }
</script>
