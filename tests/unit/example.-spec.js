// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import {
  mount,
  createLocalVue
} from '@vue/test-utils'

import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('HelloWorld.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(HelloWorld, {
      localVue,
      vuetify,
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
