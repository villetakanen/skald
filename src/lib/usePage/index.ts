import Vue from 'vue'
import { computed } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import router from '@/router'
import { Page } from '@/plugins/skaldfire'

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
  htmlContentDraft: ''
}
const pageState = Vue.observable(pageData)
const metaState = {
  loading: false
}
let activeSite = ''
let activePage = ''
let unsubscribe = () => {}

function resetPageState () {
  pageState.siteid = ''
  pageState.pageid = ''
  pageState.name = ''
  pageState.content = ''
  pageState.htmlContent = ''
  pageState.htmlContentDraft = ''
}

function subscribeToPage (params:Object) {
  const pageRoute = params as PageRoute
  console.log('"' + pageRoute.siteid + '"')
  if (pageRoute.siteid !== activeSite || pageRoute.pageid !== activePage) {
    activeSite = pageRoute.siteid
    if (pageRoute.pageid) activePage = pageRoute.pageid
    else activePage = pageRoute.siteid
    unsubscribe()
    if (activeSite) {
      const db = firebase.firestore()
      const pageRef = db.collection('sites').doc(activeSite).collection('pages').doc(activePage)
      unsubscribe = pageRef.onSnapshot((pageSnapShot) => {
        resetPageState()
        pageState.siteid = activeSite
        pageState.pageid = activePage
        pageState.name = pageSnapShot.data()?.name
        pageState.content = pageSnapShot.data()?.content
        pageState.htmlContent = pageSnapShot.data()?.htmlContent
        if (pageSnapShot.data()?.htmlContentDraft) pageState.htmlContentDraft = pageSnapShot.data()?.htmlContentDraft
        else pageState.htmlContentDraft = ''
        console.log(pageState)
      })
    }
  }
}

export function usePage () {
  // Route changed, subscribe to the siteid in the route, if any
  subscribeToPage(router.currentRoute.params)
  router.afterEach(route => {
    subscribeToPage(route.params)
  })
  const page = computed(() => pageState)
  return { page }
}
