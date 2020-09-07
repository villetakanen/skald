import { shallowMount } from '@vue/test-utils'
import PagelogList from './PagelogList.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(PagelogList, {
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
