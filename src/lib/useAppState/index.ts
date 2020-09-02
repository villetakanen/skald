import { computed, ref } from '@vue/composition-api'
import { FirebaseError } from 'firebase'

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

function raiseError (error:FirebaseError): void
function raiseError (name:string, message:string, code?:string): void

function raiseError (error:string | FirebaseError, message?:string, code?:string) {
  const fbError = error as FirebaseError
  if (fbError) {
    setError(fbError.name, fbError.message, fbError.code)
  } else {
    if (!message) message = error as string
    setError(error as string, message, code)
  }
}
function setError (name:string, message:string, code?:string): void {
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
