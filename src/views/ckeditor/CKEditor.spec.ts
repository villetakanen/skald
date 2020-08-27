import { shallowMount } from '@vue/test-utils'
import CKEditor from './CKEditor.vue'

describe('Mounted App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(CKEditor)
    expect(wrapper.element).toMatchSnapshot()
  })
})
