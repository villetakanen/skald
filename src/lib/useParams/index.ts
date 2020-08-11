import Vue from 'vue'
import { computed } from '@vue/composition-api'
import router from '../../router'

const routeData = Vue.observable({ params: {}, query: {} })
router.afterEach(route => {
  routeData.params = route.params
  routeData.query = route.query
})
export function useParams () {
  return computed(() => routeData.params)
}
