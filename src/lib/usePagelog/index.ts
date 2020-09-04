import Vue from 'vue'
import VueCompositionAPI, { computed } from '@vue/composition-api'
import firebase, { FirebaseError } from 'firebase/app'
import 'firebase/firestore'
// import router from '@/router'
// import { Page } from '@/plugins/skaldfire'
import { useAppState } from '../useAppState'
import { useProfile } from '../useProfile'

const stamp = (action: string, siteid:string, pageid?:string, silent?:boolean):void => {
  const { raiseError } = useAppState()
  const { activeProfile } = useProfile()
  if (!action || !siteid) {
    raiseError('Invalid stamp', 'Missing action or site id')
    return
  }
  let p = pageid
  if (!p) p = siteid
  let silence = false
  if (silent) silence = true
  const logRow = {
    action: action,
    siteid: siteid,
    pageid: p,
    creator: activeProfile.value?.uid,
    creatorNick: activeProfile.value?.nick,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    silent: silence
  }
  const db = firebase.firestore()
  const logRef = db.collection('pagelog').doc(siteid + '.' + p)
  logRef.set(logRow).catch((error:Error) => { raiseError(error as FirebaseError) })

  const siteRef = db.collection('sites').doc(siteid)
  siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() }).catch((error:Error) => { raiseError(error as FirebaseError) })
}

export function usePagelog () {
  return { stamp }
}
