import { it, expect, describe, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import Footer from '@/components/layout/Footer.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('Footer component test suite', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(Footer)
  })

  it('component exists', () => {
    expect(Footer).toBeTruthy()
  })

  it('contains certain text', () => {
    expect(wrapper.text()).toContain(
      'Copyright © 2023 - All right reserved by Nikola Ivanović'
    )
  })

  it('contains footer element', () => {
    expect(wrapper.find('footer').exists()).toBe(true)
  })
})
