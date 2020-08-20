import Vue from 'vue'
import { computed, ref } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Profile } from '@/plugins/skaldfire'
import { useAppState } from '@/lib/useAppState'

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

function isOwner (siteid:string):Boolean {
  if (!profileRef.value.owns) return false
  return profileRef.value.owns.includes(siteid)
}

export function useProfile () {
  return { activeProfile, isOwner }
}
