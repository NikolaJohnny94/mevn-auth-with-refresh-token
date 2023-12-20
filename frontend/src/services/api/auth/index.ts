import api from '@/api'

import { getTokenFromLocalStorage } from '@/utils'

import type { RegistrationData, LoginData } from '@/types'

export class AuthService {
  registration(registrationData: RegistrationData) {
    const { username, email, password } = registrationData

    return api.post('/registration', {
      username,
      email,
      password,
    })
  }

  login(loginData: LoginData) {
    const { loginIdentifier, password } = loginData

    return api.post('/login', {
      loginIdentifier,
      password,
    })
  }

  getUser() {
    return api.get('/me', {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage('token')}`,
      },
    })
  }

  logoutUser() {
    return api.post('/logout', {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage('token')}`,
      },
    })
  }
}
