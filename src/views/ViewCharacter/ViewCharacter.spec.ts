import { shallowMount } from '@vue/test-utils'
import ViewCharacter from './ViewCharacter.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ViewCharacter)
    expect(wrapper.element).toMatchSnapshot()
  })
})
