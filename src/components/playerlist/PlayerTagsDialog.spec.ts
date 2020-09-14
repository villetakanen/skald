import { shallowMount } from '@vue/test-utils'
import PlayerTagsDialog from './PlayerTagsDialog.vue'

describe('Mounted App', () => {
  it('Renders with usePlayers init for "mekanismi"', () => {
    const wrapper = shallowMount(PlayerTagsDialog, {
      mocks: {
        $t: () => {}
      },
      propsData: {
        siteid: 'skald',
        uid: ''
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
