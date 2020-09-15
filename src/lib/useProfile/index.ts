import Vue from 'vue'
import VueCompositionAPI, { computed, ref } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Profile } from '@/plugins/skaldfire'
import { useAppState } from '@/lib/useAppState'

Vue.use(VueCompositionAPI)

const profile:Profile = {
  uid: '',
  nick: ''
}
const userRef = ref({ uid: '' })
const profileRef = ref(profile)
const activeProfile = computed(():undefined|Profile => {
  if (profileRef.value.uid) {
    return profileRef.value
  } else {
    return undefined
  }
})
let unsubscribe = () => {}
let init:boolean = false
/**
 * resets local state vars and
 * unsubscribes to firebase profile changes
 */
function resetState () {
  unsubscribe()
  userRef.value = { uid: '' }
  profileRef.value = {
    uid: '',
    nick: ''
  }
}

function isOwner (siteid:string|undefined):Boolean {
  if (!siteid) return false
  if (!profileRef.value.owns) return false
  return profileRef.value.owns.includes(siteid)
}

const activeUid = computed(():string => {
  if (activeProfile.value?.uid) return activeProfile.value?.uid
  return ''
})
const activeNick = computed(():string => {
  if (activeProfile.value?.nick) return activeProfile.value?.nick
  return 'anonymoud'
})

export function useProfile () {
  if (!init) {
    firebase.auth().onAuthStateChanged((user) => {
    // Login or logout happened:
    // stop listening to profile changes, and reset the state
      resetState()

      if (user) {
      // Subscribe to profile data from Firestore
        const db = firebase.firestore()
        const fbProfileRef = db.collection('profiles').doc(user.uid)
        unsubscribe = fbProfileRef.onSnapshot((profileDoc) => {
          if (profileDoc) {
            profileRef.value.uid = profileDoc.id
            profileRef.value.nick = profileDoc.data()?.nick
            profileRef.value.owns = profileDoc.data()?.owns
          } else {
            const { raiseError } = useAppState()
            raiseError('Missing Profile',
              'Fetching profile for ' + user.uid + ' / ' + user.email + ' failed',
              'errors.missingProfile')
          }
        })
      }
    })
    init = true
  }
  return { activeUid, activeNick, activeProfile, isOwner }
}
