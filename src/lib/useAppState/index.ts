import Vue from 'vue'
import VueCompositionApi, { computed, ref } from '@vue/composition-api'

Vue.use(VueCompositionApi)

interface State {
  errorName?:string
  errorCode?:string,
  errorMessage?:string
  snackTitle?:string,
  snackMessage?:string
}

const localState:State = {
  errorCode: '',
  errorName: '',
  errorMessage: '',
  snackTitle: '',
  snackMessage: ''
}

const state = ref(localState)
export const alerts = computed(() => state.value.errorName && state.value.errorName.length > 0)
function raiseError (name:string, message:string, code?:string) {
  state.value.errorName = name
  state.value.errorMessage = message
  state.value.errorCode = code
}
function clearErrors () {
  state.value.errorName = ''
  state.value.errorCode = ''
  state.value.errorMessage = ''
}
function clearSnack () {
  state.value.snackTitle = ''
  state.value.snackMessage = ''
}
function pushSnack (title:string, message:string) {
  state.value.snackTitle = title
  state.value.snackMessage = message
}
export function useAppState () {
  return { state, alerts, raiseError, clearErrors, pushSnack, clearSnack }
}
