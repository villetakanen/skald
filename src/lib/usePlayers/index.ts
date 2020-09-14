import { useSite } from '../useSite'
import { ref } from '@vue/composition-api'
import firebase, { FirebaseError } from 'firebase/app'
import 'firebase/firestore'

export interface Player {
  nick: string
  uid: string
  tags?: string[]
}

const playerListStruct:Player[] = []
const players = ref({ list: playerListStruct })
const meta = ref({
  activeSiteId: '',
  loading: false
})

let unsubscribe = () => {}

function subscribePlayers (siteid:string):void {
  if (meta.value.activeSiteId === siteid) return
  unsubscribe()
  meta.value.activeSiteId = siteid
  players.value.list.length = 0
  if (!siteid) return
  meta.value.loading = true
  const db = firebase.firestore()
  const playersRef = db.collection('sites').doc(siteid).collection('players')
  unsubscribe = playersRef.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
      if (change.type === 'added') {
        players.value.list.push({
          uid: change.doc.id,
          nick: change.doc.data().nick,
          tags: change.doc.data().tags
        })
      } else if (change.type === 'removed') {
        const clearedList: Player[] = players.value.list.filter((item) => { return item.uid !== change.doc.id })
        players.value.list = clearedList
      }
    })
    meta.value.loading = false
  })
}

/**
 * Get a Player Entity for the Site
 *
 * @param uid the UID of Player of the active site
 */
function getPlayer (uid:string):Player|null {
  players.value.list.forEach((p:Player) => {
    if (p.uid === uid) return p
  })
  return null
}

export function usePlayers () {
  const { site } = useSite()
  subscribePlayers(site.value.siteid)
  return { players, getPlayer }
}
