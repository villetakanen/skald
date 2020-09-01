import { shallowMount } from '@vue/test-utils'
import CreatePageAction from './CreatePageAction.vue'

describe('CreatePageAction', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(CreatePageAction, {
      mocks: {
        $t: () => {}
      },
      propsData: {
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
