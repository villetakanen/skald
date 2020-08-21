import Vue from 'vue'
import VueCompositionApi, { computed, ref } from '@vue/composition-api'

Vue.use(VueCompositionApi)

interface State {
  errorName?:string
  errorCode?:string,
  errorMessage?:string
}

const localState:State = {
  errorCode: '',
  errorName: '',
  errorMessage: ''
}

const state = ref(localState)
export const alerts = computed(() => state.value.errorName && state.value.errorName.length > 0)
function raiseError (name:string, message:string, code?:string) {
  state.value.errorName = name
  state.value.errorMessage = message
  state.value.errorCode = code
}
function clearErrors () {
  state.value.errorName = undefined
  state.value.errorCode = undefined
  state.value.errorMessage = undefined
}
export function useAppState () {
  return { state, alerts, raiseError, clearErrors }
}
