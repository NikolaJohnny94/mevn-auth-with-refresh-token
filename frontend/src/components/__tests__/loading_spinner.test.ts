import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { LoadingSpinner } from '@/components'

import type { VueWrapper } from '@vue/test-utils'

describe('Loading Spinner test suite', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    wrapper = mount(LoadingSpinner)
  })

  it('checks if loading spinner exists', () => {
    const loadingSpinner = wrapper.find('.loading-spinner')

    expect(loadingSpinner).toBeTruthy()
  })
})
