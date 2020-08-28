import { shallowMount } from '@vue/test-utils'
import ViewPage from './ViewPage.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ViewPage, {
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
