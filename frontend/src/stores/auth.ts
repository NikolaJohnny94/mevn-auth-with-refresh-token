import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { AuthService } from '@/services/api/auth'

import { removeTokensFromLocalStorage } from '@/utils'

import type { AxiosError } from 'axios'
import type { User, RegistrationData, LoginData, ErrorResponse } from '@/types'

const authService = new AuthService()

export const useAuthStore = defineStore('auth', () => {
  //State
  const user = ref({} as User)
  const errorMessage = ref('')
  const loading = ref(false)
  const registerSuccess = ref(false)
  const loginSuccess = ref(false)

  //Getters
  const getUser = computed(() => user)
  const getLoading = computed(() => loading)
  const getRegisterSuccess = computed(() => registerSuccess)
  const getLoginSuccess = computed(() => loginSuccess)
  const getErrorMessage = computed(() => errorMessage)

  //Actions
  const registerUser = async (registrationData: RegistrationData) => {
    try {
      loading.value = true

      const { data } = await authService.registration(registrationData)

      if (data.success) {
        loading.value = false
        registerSuccess.value = true
      }
    } catch (err: any) {
      loading.value = false

      let error: AxiosError = err

      if ((error.response?.data as ErrorResponse).message) {
        errorMessage.value = (error.response?.data as ErrorResponse).message
      } else {
        errorMessage.value = error.message
      }

      clearErrorMessage()
    }
  }

  const loginUser = async (loginData: LoginData) => {
    try {
      loading.value = true

      const { data } = await authService.login(loginData)

      if (data.success) {
        loading.value = false
        loginSuccess.value = true

        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
      }
    } catch (err: any) {
      loading.value = false

      let error: AxiosError = err

      if ((error.response?.data as ErrorResponse).message) {
        errorMessage.value = (error.response?.data as ErrorResponse).message
      } else {
        errorMessage.value = error.message
      }

      clearErrorMessage()
    }
  }

  const getLoggedUser = async () => {
    try {
      loading.value = true

      const { data } = await authService.getUser()

      if (data) {
        loading.value = false

        user.value = data.data
      }
    } catch (err: any) {
      loading.value = false

      let error: AxiosError = err

      if ((error.response?.data as ErrorResponse).message) {
        errorMessage.value = (error.response?.data as ErrorResponse).message
      } else {
        errorMessage.value = error.message
      }
      clearErrorMessage()
    }
  }

  const logoutUser = async () => {
    try {
      loading.value = true

      const { data } = await authService.logoutUser()

      if (data.success) {
        loading.value = false
        user.value = {} as User

        removeTokensFromLocalStorage()
      }
    } catch (err: any) {
      loading.value = false

      let error: AxiosError = err

      if ((error.response?.data as ErrorResponse).message) {
        errorMessage.value = (error.response?.data as ErrorResponse).message
      } else {
        errorMessage.value = error.message
      }
      clearErrorMessage()
    }
  }

  const clearErrorMessage = () => {
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  }

  return {
    user,
    loading,
    registerSuccess,
    loginSuccess,
    errorMessage,
    getUser,
    getLoading,
    getRegisterSuccess,
    getLoginSuccess,
    getErrorMessage,
    registerUser,
    loginUser,
    getLoggedUser,
    logoutUser,
    clearErrorMessage,
  }
})
