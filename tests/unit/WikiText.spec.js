// Utilities
import {
  mount
} from '@vue/test-utils'

import WikiText from '@/components/WikiText.vue'

describe('WikiText.vue', () => {
  it('Renders basic markdown when passed', () => {
    const content = '# A header \n\n with some text'
    const wrapper = mount(WikiText, {
      /* localVue,
      vuetify, */
      propsData: { content }
    })
    expect(wrapper.vm.rended.split('\n').join('')).toEqual('<h1>A header</h1><p>with some text</p>')
  })
})
