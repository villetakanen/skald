import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import TabTitle from './TabTitle.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('Mounted App', () => {
  const wrapper = shallowMount(TabTitle, {
    propsData: {
      topic: 'skald'
    },
    localVue,
    router
  })

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
