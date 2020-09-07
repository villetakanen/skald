import Vue from 'vue'
import VueCompositionAPI, { computed, ref } from '@vue/composition-api'
import firebase, { FirebaseError } from 'firebase/app'
import 'firebase/firestore'
// import router from '@/router'
// import { Page } from '@/plugins/skaldfire'
import { useAppState } from '../useAppState'
import { useProfile } from '../useProfile'

interface PageLogItem {
    action: string,
    siteid: string,
    pageid: string,
    creator: string
    creatorNick: string
    timestamp: firebase.firestore.FieldValue
    silent: boolean
  }

const stamp = (action: string, siteid:string, pageid?:string, silent?:boolean):void => {
  const { raiseError } = useAppState()
  const { activeUid, activeNick } = useProfile()
  if (!action || !siteid) {
    raiseError('Invalid stamp', 'Missing action or site id')
    return
  }
  let p = pageid
  if (!p) p = siteid
  let silence = false
  if (silent) silence = true
  const logRow:PageLogItem = {
    action: action,
    siteid: siteid,
    pageid: p,
    creator: activeUid.value,
    creatorNick: activeNick.value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    silent: silence
  }
  const db = firebase.firestore()
  const logRef = db.collection('pagelog').doc(siteid + '.' + p)
  logRef.set(logRow).catch((error:Error) => { raiseError(error as FirebaseError) })

  const siteRef = db.collection('sites').doc(siteid)
  siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() }).catch((error:Error) => { raiseError(error as FirebaseError) })
}

const pageLogStruct:PageLogItem[] = []
const pageLogState = ref({ log: pageLogStruct })
const pagelog = computed(() => pageLogState.value.log.reverse())
let _init = false

function init () {
  if (_init) return
  const db = firebase.firestore()
  const logRef = db.collection('pagelog')
  logRef.orderBy('timestamp', 'desc').onSnapshot((logSnapshot) => {
    logSnapshot.docChanges().forEach((logEntryChange) => {
      const data = logEntryChange.doc.data()
      const logRow:PageLogItem = data as PageLogItem
      if (logEntryChange.type === 'added') {
        pageLogState.value.log.push(logRow)
      }
    })
  })
  _init = true
}

export function usePagelog () {
  init()
  return { pagelog, stamp }
}
