import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'
import getTokenFromLocalStorage from '@/utils/getTokenFromLocalStorage'

import Login from '@/views/auth/Login.vue'
import Registration from '@/views/auth/Registration.vue'
import User from '@/views/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: (to) => 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: { requiresAuth: true, hideRegistrationAndLoginSection: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const { registerSuccess, loginSuccess, errorMessage } = storeToRefs(authStore)

  if (
    to.matched.some(
      (route) => route.meta.requiresAuth && !getTokenFromLocalStorage('token')
    )
  ) {
    next({ name: 'login' })
  } else if (to.name === 'login' && getTokenFromLocalStorage('token')) {
    next({ name: 'user' })
  } else if (to.name === 'registration' && getTokenFromLocalStorage('token')) {
    next({ name: 'user' })
  } else {
    errorMessage.value = ''
    next()
  }

  if (from.name === 'registration' && registerSuccess.value) {
    registerSuccess.value = false
  }

  if (from.name === 'login' && loginSuccess.value) {
    loginSuccess.value = false
  }
})

export default router
