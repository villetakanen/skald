import { shallowMount } from '@vue/test-utils'
import Character from './Character.vue'

describe('Mounted App', () => {
  const wrapper = shallowMount(Character)
  it('renders correctly', () => {
    const wrapper = shallowMount(Character)
    expect(wrapper.element).toMatchSnapshot()
  })
})
