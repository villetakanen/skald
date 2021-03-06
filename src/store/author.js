import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  uid: null,
  nick: null,
  photoURL: null,
  pageLog: [],
  ssoUser: null,
  unsubscibePageLog: () => {}
}
const getters = {
  uid: (context) => () => {
    return context.uid
  },
  nick: (context) => () => {
    return context.nick
  },
  pageLog: (context) => () => {
    return context.pageLog
  },
  ssoUser: (context) => () => {
    return context.ssoUser
  },
  photoURL: (context) => () => {
    if (!context.photoURL) return null
    return context.photoURL
  },
  ssoPhotoURL: (context) => () => {
    if (!context.ssoUser) return null
    return context.ssoUser.photoURL
  },
  profile: (context) => () => {
    return {
      uid: JSON.stringify(context.uid),
      nick: JSON.stringify(context.nick),
      photoURL: JSON.stringify(context.photoURL)
    }
  }
}
const mutations = {
  setUid (context, uid) {
    Vue.set(context, 'uid', uid)
  },
  setSSOUser (context, uid) {
    Vue.set(context, 'ssoUser', uid)
  },
  setNick (context, uid) {
    Vue.set(context, 'nick', uid)
  },
  patchPageLog (context, data) {
    if (typeof data === 'undefined') return
    const log = context.pageLog
    log.push(data)
    Vue.set(context, 'pageLog', log)
  },
  theme (context, theme) {
    Vue.set(context, 'theme', theme)
  },
  setProfileData (context, data) {
    if (data.photoURL) Vue.set(context, 'photoURL', data.photoURL)
  },
  setPhotoURL (context, url) {
    Vue.set(context, 'photoURL', url)
  }
}
const actions = {
  login (context, user) {
    context.commit('setUid', user.uid)
    context.commit('setSSOUser', user)

    // context.dispatch('savePhotoURL', user.photoURL)

    const db = firebase.firestore()

    const profile = db.collection('profiles').doc(user.uid)

    // Lets try to get the Profile of the Author, and init all
    // Author data feeds
    profile.get().then((doc) => {
      // Firebase gives us undefined profile, if the user does not have a
      // Profile object
      if (typeof doc.data() === 'undefined') {
        context.commit('profileMissing', true, { root: true })
        return
      }

      context.commit('setNick', doc.data().nick)
      context.commit('setProfileData', doc.data())
      // Set theme to light, if the user wants to use the light theme :D
      context.commit('theme', doc.data().vuetifyTheme)
      // Subscribe to author pagelog
      context.state.unsubscibePageLog = profile.collection('pagelog').onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          context.commit('patchPageLog', { id: change.doc.id, data: change.doc.data() })
        })
      })
    }).catch((error) => {
      context.commit('error', error, { root: true })
    })
  },
  /**
   * Set the Vuetify theme to dark or light
   * @param {*} context Vuex context
   * @param {boolean} theme true = dark, false = light
   */
  theme (context, theme) {
    context.commit('theme', theme)
    const db = firebase.firestore()
    const profile = db.collection('profiles').doc(context.state.uid)
    profile.update({ vuetifyTheme: theme })
  },
  /**
   * Saves said photo url to firebase, as the photo url
   * @param {*} context Vuex context
   * @param {*} photoURL URL, do note if you post a non valid URL, an error will be thrown.
   */
  savePhotoURL (context, photoURL) {
    try {
      photoURL = new URL(photoURL).toString()
    } catch (error) {
      context.commit('error', error, { root: true })
    }
    const db = firebase.firestore()
    const profile = db.collection('profiles').doc(context.state.uid)
    profile.update({ photoURL: photoURL }).then(
      context.commit('setPhotoURL', photoURL)
    )
  },
  removePhotoURL (context) {
    const db = firebase.firestore()
    const profile = db.collection('profiles').doc(context.state.uid)
    profile.update({ photoURL: null }).then(
      context.commit('setPhotoURL', null)
    )
  },
  nick (context, nick) {
    if (nick === null || typeof nick === 'undefined') throw new Error()
    context.commit('setNick', nick)
    const db = firebase.firestore()
    const profile = db.collection('profiles').doc(context.state.uid)
    profile.update({ nick: nick }).catch((error) => {
      if (error.code === 'not-found') {
        profile.set({
          nick: nick,
          vuetifyTheme: true
        })
      } else context.commit('error', error, { root: true })
    })
  },
  logout (context, user) {
    if (context.state.uid !== null) {
      context.commit('setUid', null)
      context.commit('setNick', null)
    }
    context.state.unsubscibePageLog()
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
