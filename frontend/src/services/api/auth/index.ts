import axios from 'axios'
import apiInterceptors from '@/api'
import { getTokenFromLocalStorage } from '@/utils'

import type { RegistrationData, LoginData } from '@/types'

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export class AuthService {
  registration(registrationData: RegistrationData) {
    const { username, email, password } = registrationData

    return axios.post(`${BASE_URL}/registration`, {
      username,
      email,
      password,
    })
  }

  login(loginData: LoginData) {
    const { loginIdentifier, password } = loginData

    return axios.post(`${BASE_URL}/login`, {
      loginIdentifier,
      password,
    })
  }

  getUser() {
    return (process.env.NODE_ENV === 'test' ? axios : apiInterceptors).get(
      '/me',
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage('token')}`,
        },
      }
    )
  }

  logoutUser() {
    return (process.env.NODE_ENV === 'test' ? axios : apiInterceptors).post(
      `${BASE_URL}/logout`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage('token')}`,
        },
      }
    )
  }
}
