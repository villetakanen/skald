import { useSite } from '../useSite'
import { ref } from '@vue/composition-api'
import firebase, { FirebaseError } from 'firebase/app'
import 'firebase/firestore'
interface Player {
  nickName: string
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
          nickName: change.doc.data().nickName,
          tags: change.doc.data().tags
        })
      }
    })
    meta.value.loading = false
  })
}

export function usePlayers () {
  const { site } = useSite()
  subscribePlayers(site.value.siteid)
  return { players }
}
