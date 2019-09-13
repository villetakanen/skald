// Libraries
// import Vue from 'vue'
// import Vuetify from 'vuetify'

// Utilities
import {
  mount// ,
//   createLocalVue
} from '@vue/test-utils'

import WikiText from '@/components/WikiText.vue'

// Vue.use(Vuetify)
// const localVue = createLocalVue()

describe('WikiText.vue', () => {
  // let vuetify

  // beforeEach(() => {
  //   vuetify = new Vuetify()
  // })

  it('Renders basic markdown when passed', () => {
    const content = '# A header \n\n with some text'
    const wrapper = mount(WikiText, {
      /* localVue,
      vuetify, */
      propsData: { content }
    })
    expect(wrapper.html()).toMatch('<div class="wikipage"><div><div><h1>A header</h1><p>with some text</p><p></p></div></div></div>')
  })
})
