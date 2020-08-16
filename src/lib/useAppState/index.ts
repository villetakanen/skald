import Vue from 'vue'
import { computed } from '@vue/composition-api'

interface State {
  errorName?:string
  errorCode?:string,
  errorMessage?:string
}

const state:State = {}

export function useAppState () {
  const appState = computed(() => state)
  const raiseError = (name:string, message:string, code?:string) => {
    state.errorName = name
    state.errorMessage = message
    if (code) state.errorCode = code
    else state.errorCode = 'Unknown'
  }
  const clearErrors = () => {
    state.errorName = undefined
    state.errorCode = undefined
    state.errorMessage = undefined
  }
  return { appState, raiseError, clearErrors }
}
