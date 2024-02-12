import { it, expect, describe, vi, beforeEach, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import UserVue from '@/views/User.vue'

import { useAuthStore } from '@/stores/auth'
import { routes } from '@/router'

import type { VueWrapper } from '@vue/test-utils'
import type { Router } from 'vue-router'

describe('UserView testing suite', () => {
  let router: Router
  let wrapper: VueWrapper

  beforeAll(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })

    router.push('/user')

    await router.isReady()
  })

  beforeEach(() => {
    wrapper = mount(UserVue, {
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

  it('Check if getLoggedUser is called twice', async () => {
    const authStore = useAuthStore()

    axios.get = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully retrieved from the database!',
        data: {
          username: 'Nidza123',
          createdAt: '2023-11-05T17:19:21.795Z',
          email: 'nikola@email.com',
          role: 'user',
          updatedAt: '2023-11-05T17:19:21.795Z',
          __v: 0,
          _id: '6547ce99b9b265aa6e8b5386',
        },
      },
    })

    await authStore.getLoggedUser()
    expect(authStore.getLoggedUser).toHaveBeenCalledTimes(2)
  })

  it('Check if getLoggedUser is called twice', async () => {
    const authStore = useAuthStore()

    axios.get = vi.fn().mockResolvedValue({
      data: {
        success: true,
        message: 'User successfully retrieved from the database!',
        data: {
          username: 'Nidza123',
          createdAt: '2023-11-05T17:19:21.795Z',
          email: 'nikola@email.com',
          role: 'user',
          updatedAt: '2023-11-05T17:19:21.795Z',
          __v: 0,
          _id: '6547ce99b9b265aa6e8b5386',
        },
      },
    })

    await authStore.getLoggedUser()

    expect(authStore.user).toStrictEqual({
      username: 'Nidza123',
      createdAt: '2023-11-05T17:19:21.795Z',
      email: 'nikola@email.com',
      role: 'user',
      updatedAt: '2023-11-05T17:19:21.795Z',
      __v: 0,
      _id: '6547ce99b9b265aa6e8b5386',
    })
  })
})
