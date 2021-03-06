import Vue from 'vue'
import VueCompositionAPI, { computed, ref } from '@vue/composition-api'
import { FirebaseError } from 'firebase'
import { useProfile } from '../useProfile'
import { useSite } from '../useSite'

Vue.use(VueCompositionAPI)

interface State {
  errorName?:string
  errorCode?:string,
  errorMessage?:string
  snackTitle?:string,
  snackMessage?:string
  createPageDialog:boolean
}

const localState:State = {
  errorCode: '',
  errorName: '',
  errorMessage: '',
  snackTitle: '',
  snackMessage: '',
  createPageDialog: false
}

const state = ref(localState)
export const alerts = computed(() => state.value.errorName && state.value.errorName.length > 0)

function raiseError (error:FirebaseError): void
function raiseError (name:string, message:string, code?:string): void

function raiseError (error:string | FirebaseError, message?:string, code?:string) {
  // Page not found error, lets check if the user has create rights, and show create-dialog instead
  if (code === '404') {
    const { isOwner } = useProfile()
    const { site } = useSite()
    if (isOwner(site.value.siteid)) {
      state.value.createPageDialog = true
      return
    }
  }
  if (typeof error === 'string') {
    if (!message) message = error as string
    setError(error as string, message, code)
  } else {
    const fbError = error as FirebaseError
    setError(fbError.name, fbError.message, fbError.code)
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

const launchCreatePageDialog = computed({ get: () => state.value.createPageDialog, set: (trigger:boolean) => { state.value.createPageDialog = trigger } })

export function useAppState () {
  return { state, alerts, raiseError, clearErrors, pushSnack, clearSnack, launchCreatePageDialog }
}
