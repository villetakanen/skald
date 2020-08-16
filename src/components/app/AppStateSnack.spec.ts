import { shallowMount } from '@vue/test-utils'
import AppStateSnack from './AppStateSnack.vue'

describe('Mounted App', () => {
  const wrapper = shallowMount(AppStateSnack)

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
