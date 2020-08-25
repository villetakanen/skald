import { shallowMount, createLocalVue } from '@vue/test-utils'
import Themed from './Themed.vue'
import VueRouter from 'vue-router'

describe('Mounted App', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter()
  const wrapper = shallowMount(Themed, { router, localVue })

  test('is a Vue instance', () => {
    expect(wrapper.find('div').vm).toBeTruthy()
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
