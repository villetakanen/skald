import { shallowMount } from '@vue/test-utils'
import Themed from './Themed.vue'

describe('Mounted App', () => {
  const wrapper = shallowMount(Themed)

  test('is a Vue instance', () => {
    expect(wrapper.find('div').vm).toBeTruthy()
  })

  it('renders correctly', () => {
    const wrapper = shallowMount(Themed)
    expect(wrapper.element).toMatchSnapshot()
  })
})
