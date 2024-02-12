<template>
  <h2 class="text-center text-3xl p-4">Registration</h2>
  <form
    class="w-[300px] flex flex-col items-center m-auto"
    @submit="registration"
  >
    <input
      id="username"
      type="text"
      placeholder="Enter your username"
      class="input input-bordered w-full max-w-xs m-3"
      v-model="username"
      v-bind="usernameAttrs"
    />
    <FormValidationError
      id="username-validation-error"
      v-if="errors.username"
      :message="errors.username"
    />
    <input
      id="email"
      type="email"
      placeholder="Enter your email"
      class="input input-bordered w-full max-w-xs m-3"
      v-model="email"
      v-bind="emailAttrs"
    />
    <FormValidationError
      id="email-validation-error"
      v-if="errors.email"
      :message="errors.email"
    />
    <input
      id="password"
      type="password"
      placeholder="Enter your password"
      class="input input-bordered w-full max-w-xs m-3"
      v-model="password"
      v-bind="passwordAttrs"
    />
    <FormValidationError
      id="password-validation-error"
      v-if="errors.password"
      :message="errors.password"
    />
    <input
      id="confirm-password"
      type="password"
      placeholder="Confirm password"
      class="input input-bordered w-full max-w-xs m-3"
      v-model="confirmPassword"
      v-bind="confirmPasswordAttrs"
    />
    <FormValidationError
      id="confirm-password-validation-error"
      v-if="errors.confirmPassword"
      :message="errors.confirmPassword"
    />
    <button type="submit" class="btn btn-neutral mt-3">Submit</button>
  </form>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { useForm } from 'vee-validate'

  import { useAuthStore } from '@/stores/auth'
  import { registrationValidationSchema } from '@/schemas'

  import { FormValidationError } from '@/components'

  import type { RegistrationData } from '@/types'

  const router = useRouter()
  const authStore = useAuthStore()

  const { registerUser, getRegisterSuccess } = authStore

  const { defineField, handleSubmit, errors } = useForm<
    RegistrationData & { confirmPassword: string }
  >({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationValidationSchema,
  })

  const [username, usernameAttrs] = defineField('username')
  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')
  const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

  const registration = handleSubmit(async (values) => {
    const { username, email, password } = values

    await registerUser({
      username,
      email,
      password,
    })

    if (getRegisterSuccess?.value) {
      router.push('/login')
    }
  })
</script>
