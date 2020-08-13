import { shallowMount } from '@vue/test-utils'
import AddPlayerAction from './AddPlayerAction.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(AddPlayerAction, {
      mocks: {
        $t: () => {}
      },
      propsData: {
        siteid: 'skald'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
