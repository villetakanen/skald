import { shallowMount } from '@vue/test-utils'
import ListPages from './ListPages.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ListPages, {
      mocks: {
        $t: () => { return '' }
      },
      propsData: {
        siteid: 'mekanismi'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
