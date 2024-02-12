import { it, expect, describe, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from '@/router'

import Navbar from '@/components/layout/Navbar.vue'

import type { VueWrapper } from '@vue/test-utils'
import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { nextTick } from 'vue'

describe('Navbar test suite', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/user')

    await router.isReady()

    wrapper = mount(Navbar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              auth: {
                user: {
                  username: 'Test123',
                },
              },
            },
          }),
          router,
        ],
      },
    })
  })

  it('Check if logout button exists', () => {
    if (router.currentRoute.value.meta.hideRegistrationAndLoginSection) {
      expect(wrapper.find('button').text()).toBe('Logout')
    }
  })

  it('check if username is displayed', () => {
    expect(wrapper.text()).toContain('Test123')
  })
})

describe('testing navbar on /login route', async () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/login')

    await router.isReady()

    wrapper = mount(Navbar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: {
                  username: 'Test123',
                },
              },
            },
          }),
          router,
        ],
      },
    })
  })
  it('checks if login anchor exists', () => {
    expect(wrapper.find('a[href="/login"]').exists()).toBe(true)
  })

  it('checks if registration anchor exists', () => {
    expect(wrapper.find('a[href="/registration"]').exists()).toBe(true)
  })

  it("checks if logout button doesn't exist", () => {
    expect(wrapper.find('button:contains"Logout"').exists()).toBe(false)
  })
})

describe('Check logout functionality', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/user')

    await router.isReady()

    wrapper = mount(Navbar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            initialState: {
              auth: {
                user: {
                  username: 'Test123',
                },
              },
            },
          }),
          router,
        ],
      },
    })
  })

  it('Check if user is set to empty object after logout', async () => {
    if (router.currentRoute.value.meta.hideRegistrationAndLoginSection) {
      const authStore = useAuthStore()

      axios.post = vi.fn().mockResolvedValue({
        data: {
          success: true,
          message: 'User successfully logged out!',
        },
      })

      const logoutButton = wrapper.find('button:contains"Logout"')

      await logoutButton.trigger('click')

      expect(authStore.user).toStrictEqual({})
    }
  })
})
