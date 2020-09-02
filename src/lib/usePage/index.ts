import Vue from 'vue'
import { computed } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import router from '@/router'
import { Page } from '@/plugins/skaldfire'
import { useAppState } from '../useAppState'

interface PageRoute {
    siteid:string,
    pageid?:string
  }

const pageData:Page = {
  pageid: '',
  siteid: '',
  name: '',
  content: '',
  htmlContent: '',
  htmlContentDraft: '',
  category: ''
}
const pageState = Vue.observable(pageData)
const metaState = {
  loading: true
}
let activeSite = ''
let activePage = '-1'
let unsubscribe = () => {}

function resetPageState () {
  pageState.siteid = ''
  pageState.pageid = ''
  pageState.name = ''
  pageState.content = ''
  pageState.htmlContent = ''
  pageState.htmlContentDraft = ''
  pageState.category = ''
}

function subscribeToPage (params:Object) {
  const pageRoute = params as PageRoute
  // console.log('routing to ', pageRoute.siteid, pageRoute.pageid)
  if (pageRoute.siteid !== activeSite || pageRoute.pageid !== activePage) {
    // console.log('and subscribing if available')
    activeSite = pageRoute.siteid
    metaState.loading = true
    if (pageRoute.pageid) activePage = pageRoute.pageid
    else activePage = pageRoute.siteid
    unsubscribe()
    if (activeSite) {
      const db = firebase.firestore()
      const pageRef = db.collection('sites').doc(activeSite).collection('pages').doc(activePage)
      unsubscribe = pageRef.onSnapshot((pageSnapShot) => {
        resetPageState()
        if (pageSnapShot.exists) {
          pageState.siteid = activeSite
          pageState.pageid = activePage
          pageState.name = pageSnapShot.data()?.name
          // Some historical pages lack name, and use slug instead
          if (!pageState.name) pageState.name = activePage
          pageState.content = pageSnapShot.data()?.content
          pageState.htmlContent = pageSnapShot.data()?.htmlContent
          pageState.category = pageSnapShot.data()?.category
          if (pageSnapShot.data()?.htmlContentDraft) pageState.htmlContentDraft = pageSnapShot.data()?.htmlContentDraft
          else pageState.htmlContentDraft = ''
          metaState.loading = false
        } else {
          const { raiseError } = useAppState()
          raiseError('Page not found', 'The page you are looking for, does not exist', '404')
        }
      })
    } else {
      metaState.loading = false
    }
  }
}

const page = computed(() => pageState)
const meta = computed(() => metaState)

export function usePage () {
  // This happens after mounting etc.
  if (activePage === '-1') {
    subscribeToPage(router.currentRoute.params)
    router.afterEach(route => {
      subscribeToPage(route.params)
    })
  }
  return { meta, page }
}
