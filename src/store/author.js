import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  uid: null,
  nick: null,
  pageLog: [],
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
  }
}
const mutations = {
  setUid (context, uid) {
    Vue.set(context, 'uid', uid)
  },
  setNick (context, uid) {
    Vue.set(context, 'nick', uid)
  },
  patchPageLog (context, data) {
    let log = context.pageLog
    log.push(data)
    Vue.set(context, 'pageLog', log)
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

    // Subscribe to author pagelog
    context.state.unsubscibePageLog = profile.collection('pagelog').onSnapshot((querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        context.commit('patchPageLog', { id: change.doc.id, data: change.doc.data() })
      })
    })
  },
  logout (context, user) {
    if (context.state.uid !== null) {
      context.commit('setUid', null)
      context.commit('setNick', null)
    }
    context.unsubscibePageLog()
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
