import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  uid: null,
  nick: null
}
const getters = {
  uid: (context) => () => {
    return context.uid
  },
  nick: (context) => () => {
    return context.nick
  }
}
const mutations = {
  setUid (context, uid) {
    Vue.set(context, 'uid', uid)
  },
  setNick (context, uid) {
    Vue.set(context, 'nick', uid)
  }
}
const actions = {
  login (context, user) {
    context.commit('setUid', user.uid)

    const db = firebase.firestore()

    const profile = db.collection('profiles').doc(user.uid)
    profile.get().then((doc) => {
      context.commit('setNick', doc.data().nick)
    })
  },
  logout (context, user) {
    if (context.state.uid !== null) {
      context.commit('setUid', null)
      context.commit('setNick', null)
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
