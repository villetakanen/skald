import { shallowMount } from '@vue/test-utils'
import PagelogItem from './PagelogItem.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(PagelogItem, {
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
