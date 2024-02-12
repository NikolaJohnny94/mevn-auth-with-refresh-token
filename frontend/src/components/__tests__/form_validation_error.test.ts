import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'

import FormValidationError from '@/components/common/FormValidationError.vue'

describe('FormValidationError test suite', () => {
  const wrapper = mount(FormValidationError, {
    props: {
      message: 'Email is required',
    },
  })

  it('check the displayed error message', () => {
    expect(wrapper.text()).toContain('Email is required')
  })
})
