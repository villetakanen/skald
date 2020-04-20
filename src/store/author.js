import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  uid: null,
  nick: null,
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
    if (!context.ssoUser) return null
    return context.ssoUser.photoURL
  },
  ssoPhotoURL: (context) => () => {
    if (!context.ssoUser) return null
    return context.ssoUser.photoURL
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
  }
}
const actions = {
  login (context, user) {
    context.commit('setUid', user.uid)
    context.commit('setSSOUser', user)
    // console.log(user)

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
