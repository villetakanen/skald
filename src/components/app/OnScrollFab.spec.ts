import { shallowMount } from '@vue/test-utils'
import OnScrollFab from './OnScrollFab.vue'

describe('Mounted App', () => {
  const wrapper = shallowMount(OnScrollFab)

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
