import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'
import VueCompositionApi, { ref } from '@vue/composition-api'
import { Site } from '@/plugins/skaldfire'
import { useAppState } from '@/lib/useAppState'
import router from '@/router'

Vue.use(VueCompositionApi)

let activeSiteid:string|null = null
let unsubscribe = () => {}
const activeSite:Site = {
  siteid: '',
  name: '',
  titleColorClass: ''
}
const site = ref(activeSite)
const loading = ref(false)

function resetSite ():void {
  site.value.siteid = ''
  site.value.name = ''
  site.value.titleColorClass = ''
}

/**
 * Subscribe to a Site from Firestore
 *
 * @param siteid id of the site we want to start watching
 */
function subscribeToSite (siteid:string|null):void {
  // If are currently subscribing this site, do no-op:
  if (siteid === activeSiteid) return
  // If we are currently in process of subscribing to a site, no op:
  if (loading.value) return

  // We need to start listening to another site from Firestore
  // console.debug('subscribeToSite switching to', siteid, 'from', activeSiteid)
  loading.value = true
  activeSiteid = siteid
  // Subscribe to new site data from Firestore
  unsubscribe()

  if (siteid) {
    const db = firebase.firestore()
    const firebaseSiteRef = db.collection('sites').doc(siteid)
    unsubscribe = firebaseSiteRef.onSnapshot((siteDoc) => {
      if (siteDoc && siteDoc.data()?.name) {
        site.value.siteid = siteDoc.id
        site.value.name = siteDoc.data()?.name
        site.value.titleColorClass = siteDoc.data()?.titleColorClass
      } else {
        resetSite()
        const { raiseError } = useAppState()
        raiseError('This is curious...', `We can not match the url parameter [${siteid}] to any existing record.`, '404')
        router.push('/')
      }
      loading.value = false
    })
  } else {
    resetSite()
    loading.value = false
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
  return { loading, site }
}
