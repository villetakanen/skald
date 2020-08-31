import { shallowMount } from '@vue/test-utils'
import WikiContent from './WikiContent.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(WikiContent)
    expect(wrapper.element).toMatchSnapshot()
  })
})
