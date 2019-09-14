// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Utilities
import {
  mount,
  createLocalVue
} from '@vue/test-utils'

import PagelogEntry from '@/components/PagelogEntry'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('PagelogEntry.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders author when passed', () => {
    const creator = 'An author? Maybe it exists.'
    const wrapper = mount(PagelogEntry, {
      localVue,
      vuetify,
      propsData: { creator }
    })
    expect(wrapper.text()).toContain(creator)
  })

  it('renders page link when passed', () => {
    const pageid = 'a-page'
    const siteid = 'a-site'
    const wrapper = mount(PagelogEntry, {
      localVue,
      vuetify,
      propsData: { pageid, siteid }
    })
    expect(wrapper.text()).toContain(siteid + '/' + pageid)
  })
})
