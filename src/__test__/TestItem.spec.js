/**
 * @jest-environment jsdom
 */

import { mount } from '@vue/test-utils'
import TestItem from '../components/TestItem.vue'

describe('Component TestItem', () => {
  it('render profile', () => {
    const wrapper = mount(TestItem)

    expect(wrapper.get('[data-test="test"]').text()).toBe('test')
  })
})
