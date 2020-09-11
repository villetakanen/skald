import { shallowMount } from '@vue/test-utils'
import PlayerList from './PlayerList.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(PlayerList, {
      mocks: {
        $t: () => {}
      },
      propsData: {
        siteid: 'mekanismi'
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
