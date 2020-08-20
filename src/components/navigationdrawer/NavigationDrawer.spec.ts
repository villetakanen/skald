import { shallowMount } from '@vue/test-utils'
import NavigationDrawer from './NavigationDrawer.vue'

describe('Mounted App', () => {
  const wrapper = shallowMount(NavigationDrawer)

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
