import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'

import ErrorToast from '@/components/common/ErrorToast.vue'

describe('ErrorToast test suite', () => {
  const wrapper = mount(ErrorToast, {
    props: {
      message:
        'User is not authorized to access this route! The access token expired!',
    },
  })

  it('check the displayed error message', () => {
    expect(wrapper.text()).toContain(
      'User is not authorized to access this route! The access token expired!'
    )
  })
})
