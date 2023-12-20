<template>
  <h2 class="text-center text-3xl p-4">Login</h2>
  <form class="w-[300px] flex flex-col items-center m-auto" @submit="login">
    <input
      type="text"
      placeholder="Enter your email or username"
      class="input input-bordered w-full max-w-xs m-3"
      v-model="loginIdentifier"
      v-bind="loginIdentifierAttrs"
    />
    <FormValidationError
      v-if="errors.loginIdentifier"
      :message="errors.loginIdentifier"
    />
    <input
      type="password"
      placeholder="Enter your password"
      class="input input-bordered w-full max-w-xs m-3"
      v-model="password"
      v-bind="passwordAttrs"
    />
    <FormValidationError v-if="errors.password" :message="errors.password" />
    <button type="submit" class="btn btn-neutral mt-3">Submit</button>
  </form>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'

  import { useAuthStore } from '@/stores/auth'
  import { loginValidationSchema } from '@/schemas'

  import { FormValidationError } from '@/components'

  import type { LoginData } from '@/types'

  const router = useRouter()
  const authStore = useAuthStore()

  const { loginUser, getLoginSuccess } = authStore

  const { defineField, handleSubmit, errors } = useForm<LoginData>({
    initialValues: {
      loginIdentifier: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
  })

  const [loginIdentifier, loginIdentifierAttrs] = defineField('loginIdentifier')
  const [password, passwordAttrs] = defineField('password')

  const login = handleSubmit(async (values) => {
    const { loginIdentifier, password } = values

    await loginUser({
      loginIdentifier,
      password,
    })

    if (getLoginSuccess?.value) {
      router.push('/user')
    }
  })
</script>
