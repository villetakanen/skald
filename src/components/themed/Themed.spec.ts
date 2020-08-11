import { mount } from '@vue/test-utils'
import Themed from './Themed.vue'

describe('Mounted App', () => {
  const wrapper = mount(Themed)

  test('is a Vue instance', () => {
    expect(wrapper.find('div').vm).toBeTruthy()
  })
})
