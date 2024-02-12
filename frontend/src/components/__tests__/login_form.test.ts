import { it, expect, describe, vi, beforeEach, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import LoginForm from '@/components/forms/LoginForm.vue'
import FormValidationError from '@/components/common/FormValidationError.vue'

import { useAuthStore } from '@/stores/auth'
import { routes } from '@/router'

import type { VueWrapper } from '@vue/test-utils'
import type { Router } from 'vue-router'

describe('LoginForm test suite', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/login')

    await router.isReady()

    wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router,
        ],
        components: {
          FormValidationError,
        },
      },
    })
  })

  it('checks if loginIdentifier is empty', async () => {
    const input = wrapper.find('#loginIdentifier')

    input.setValue('')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#loginIdentifier-validation-error').text()).toBe(
        'Username / email is required'
      )
    })
  })
  it('checks password is empty', async () => {
    const input = wrapper.find('#password')

    input.setValue('')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#password-validation-error').text()).toBe(
        'Password is requried'
      )
    })
  })
})

describe('Check if the input value satisfies the login validation schema', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/login')

    await router.isReady()

    wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router,
        ],
        components: {
          FormValidationError,
        },
      },
    })
  })

  it('checks if loginIdentifier is incorect', async () => {
    const input = wrapper.find('#loginIdentifier')

    input.setValue('1#')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#loginIdentifier-validation-error').text()).toBe(
        'Invalid username or email'
      )
    })
  })
  it('checks password is incorect', async () => {
    const input = wrapper.find('#password')

    input.setValue('')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#password-validation-error').text()).toBe(
        'Password is requried'
      )
    })
  })
})

describe('Check the login function from the store and the store update', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/login')

    await router.isReady()
  })

  beforeEach(() => {
    wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
          }),
          router,
        ],
      },
    })
  })

  it('Check if user logged successfully', async () => {
    const authStore = useAuthStore()

    axios.post = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully logged in!',
        token: 'accessToken',
        refreshToken: 'refreshToken',
      },
    })

    await authStore.loginUser({
      loginIdentifier: 'test123',
      password: 'Test123*',
    })

    expect(authStore.loginSuccess).toBe(true)
  })

  it('Login function called once', async () => {
    const authStore = useAuthStore()
    axios.post = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully logged in!',
        token: 'accessToken',
        refreshToken: 'refreshToken',
      },
    })

    await authStore.loginUser({
      loginIdentifier: 'test123',
      password: 'Test123*',
    })

    expect(authStore.loginUser).toHaveBeenCalledTimes(1)
  })

  it('Login function called with login data', async () => {
    const authStore = useAuthStore()
    axios.post = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully logged in!',
        token: 'accessToken',
        refreshToken: 'refreshToken',
      },
    })

    await authStore.loginUser({
      loginIdentifier: 'test123',
      password: 'Test123*',
    })

    expect(authStore.loginUser).toHaveBeenCalledWith({
      loginIdentifier: 'test123',
      password: 'Test123*',
    })
  })
})
