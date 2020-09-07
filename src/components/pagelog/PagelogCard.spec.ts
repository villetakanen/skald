import { shallowMount } from '@vue/test-utils'
import PagelogCard from './PagelogCard.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(PagelogCard, {
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
