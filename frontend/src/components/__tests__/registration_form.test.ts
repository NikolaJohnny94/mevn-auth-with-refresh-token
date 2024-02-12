import { it, describe, vi, expect, beforeEach, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import { useAuthStore } from '@/stores/auth'
import { routes } from '@/router'

import RegistrationFormVue from '@/components/forms/RegistrationForm.vue'
import FormValidationError from '@/components/common/FormValidationError.vue'

import type { VueWrapper } from '@vue/test-utils'
import type { Router } from 'vue-router'

describe('Registration Form test suite', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/registration')

    await router.isReady()

    wrapper = mount(RegistrationFormVue, {
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

  it('checks if username is empty', async () => {
    const input = wrapper.find('#username')
    input.setValue('')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#username-validation-error').text()).toBe(
        'Username is required'
      )
    })
  })

  it('checks if email is empty', async () => {
    const input = wrapper.find('#email')
    input.setValue('')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#email-validation-error').text()).toBe(
        'Email is required'
      )
    })
  })

  it('checks if password is empty', async () => {
    const input = wrapper.find('#password')
    input.setValue('')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#password-validation-error').text()).toBe(
        'Password is required'
      )
    })
  })

  it('checks if confirm password is empty', async () => {
    const input = wrapper.find('#confirm-password')
    input.setValue('')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#confirm-password-validation-error').text()).toBe(
        'Password confirmation is required'
      )
    })
  })
})

describe('Check if the input value satisfies the registration validation schema', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/registration')

    await router.isReady()

    wrapper = mount(RegistrationFormVue, {
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

  it('checks if username value is invalid', async () => {
    const input = wrapper.find('#username')
    input.setValue('1#')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#username-validation-error').text()).toBe(
        'Invalid username'
      )
    })
  })

  it('checks if email value is invalid', async () => {
    const input = wrapper.find('#email')
    input.setValue('mern.email.com')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#email-validation-error').text()).toBe(
        'Invalid email address'
      )
    })
  })

  it('checks if password value is invalid', async () => {
    const input = wrapper.find('#password')
    input.setValue('Test123')
    input.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#password-validation-error').text()).toBe(
        'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
      )
    })
  })

  it('checks if confirm password value is invalid', async () => {
    const passwordInput = wrapper.find('#password')
    const confirmPasswordInput = wrapper.find('#confirm-password')
    passwordInput.setValue('Test123*')
    passwordInput.trigger('change')
    confirmPasswordInput.setValue('Test123')
    confirmPasswordInput.trigger('change')

    await flushPromises()
    await waitForExpect(() => {
      expect(wrapper.find('#confirm-password-validation-error').text()).toBe(
        'Passwords must match'
      )
    })
  })
})

describe('Checks registration function from the store and the store update', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/registration')

    await router.isReady()
  })

  beforeEach(() => {
    wrapper = mount(RegistrationFormVue, {
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

  it('Check if user registered successfully', async () => {
    const authStore = useAuthStore()

    axios.post = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully registered',
      },
    })

    await authStore.registerUser({
      username: 'test123',
      email: 'test@email.com',
      password: 'Test123*',
    })

    expect(authStore.registerSuccess).toBe(true)
  })

  it('Registration function called once', async () => {
    const authStore = useAuthStore()
    axios.post = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully registered',
      },
    })

    await authStore.registerUser({
      username: 'test123',
      email: 'test@email.com',
      password: 'Test123*',
    })

    expect(authStore.registerUser).toHaveBeenCalledOnce()
  })

  it('Registration function called once', async () => {
    const authStore = useAuthStore()
    axios.post = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully registered',
      },
    })

    await authStore.registerUser({
      username: 'test123',
      email: 'test@email.com',
      password: 'Test123*',
    })

    expect(authStore.registerUser).toHaveBeenCalledWith({
      username: 'test123',
      email: 'test@email.com',
      password: 'Test123*',
    })
  })
})
