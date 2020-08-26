import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'
import VueCompositionApi, { ref, computed } from '@vue/composition-api'
import { Site } from '@/plugins/skaldfire'
import { useAppState } from '@/lib/useAppState'
import router from '@/router'
import site from '@/store/site'

Vue.use(VueCompositionApi)

/**
 * Local struct and template for Site data from Firebase
 */
const siteData:Site = {
  name: '',
  siteid: '',
  titleColorClass: '',
  description: '',
  posterURL: '',
  theme: ''
}
const siteState = Vue.observable(siteData)
const metaState = Vue.observable({
  loading: false,
  activeSiteid: ''
})

/**
 * Firebase unsubscribe for subscribed data.
 */
let unsubscribe = () => {}

/**
 * Sets the siteState observable to initial state
 */
function resetSite ():void {
  siteState.name = ''
  siteState.siteid = ''
  siteState.titleColorClass = ''
  siteState.description = ''
  siteState.posterURL = ''
  siteState.theme = ''
}

/**
 * Subscribe to a Site from Firestore
 *
 * @param siteid id of the site we want to start watching. A null is intrepeted as "watch none", as is ''.
 */
function subscribeToSite (newSiteid:string|null):void {
  // Trying to subscribe to current site, cancel op
  if (newSiteid === metaState.activeSiteid) return
  metaState.activeSiteid = newSiteid === null ? '' : newSiteid
  metaState.loading = true

  // Firestore unsubscribe for the old sitedata
  unsubscribe()

  // If we have siteid, lets start listening to it from Firestore
  if (newSiteid) {
    const db = firebase.firestore()
    const firebaseSiteRef = db.collection('sites').doc(newSiteid)
    unsubscribe = firebaseSiteRef.onSnapshot((siteDoc) => {
      if (siteDoc.exists && siteDoc.data()?.name) {
        siteState.siteid = siteDoc.id
        siteState.name = siteDoc.data()?.name
        siteState.titleColorClass = siteDoc.data()?.titleColorClass
        siteState.description = siteDoc.data()?.description
        siteState.posterURL = siteDoc.data()?.posterURL
        siteState.theme = siteDoc.data()?.theme
      } else {
        resetSite()
        metaState.loading = false
        const { raiseError } = useAppState()
        raiseError('This is curious...', `We can not match the url parameter [${newSiteid}] to any existing record.`, '404')
        router.push('/')
      }
    })
  } else {
    resetSite()
    metaState.loading = false
  }
}

export function useSite () {
  // Route changed, subscribe to the siteid in the route, if any
  subscribeToSite(router.currentRoute.params.siteid)
  router.afterEach(route => {
    let siteid:string|null = null
    if (route.params.siteid) {
      siteid = route.params.siteid
    }
    subscribeToSite(siteid)
  })
  const site = computed(() => siteState)
  const loading = computed(() => metaState.loading)
  return { loading, site }
}
