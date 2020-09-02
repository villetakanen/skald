import Vue from 'vue'
import VueCompositionAPI, { computed } from '@vue/composition-api'
import router from '../../router'

Vue.use(VueCompositionAPI)

const routeData = Vue.observable({ params: {}, query: {} })
router.afterEach(route => {
  routeData.params = route.params
  routeData.query = route.query
})
export function useParams () {
  return computed(() => routeData.params)
}
