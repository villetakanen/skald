import { shallowMount } from '@vue/test-utils'
import PlayerList from './PlayerList.vue'

describe('Mounted App', () => {
  it('Renders with usePlayers init for "mekanismi"', () => {
    const wrapper = shallowMount(PlayerList)
    expect(wrapper.element).toMatchSnapshot()
  })
})
