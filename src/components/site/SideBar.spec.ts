import { shallowMount } from '@vue/test-utils'
import SideBar from './SideBar.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(SideBar, {
      mocks: {
        $t: () => {}
      },
      propsData: {
        siteid: 'mekanismi',
        pageid: 'ohjeita'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
