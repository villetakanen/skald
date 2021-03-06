import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'

const state = {
  all: {}
}
const getters = {
  listArray: (context) => () => {
    return context.all
  },
  all: (context) => () => {
    return context.all
  },
  get: (context) => (uid) => {
    const userArray = context.all.filter((user) => {
      if (user.uid === uid) return true
    })
    if (userArray.length === 1) return userArray[0]
    // console.log('not found', uid, context.all)
    return null
  }
}

const mutations = {
  patchUser (context, { userid, data }) {
    Vue.set(context.all, userid, data)
  }
}

const actions = {
  init (context) {
    const db = firebase.firestore()
    db.collection('profiles').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        context.commit('patchUser', { userid: doc.id, data: doc.data() })
      })
    })
  },
  addOwner (context, { siteid, uid }) {
    const db = firebase.firestore()

    var user = context.getters.get(uid)
    var userSites = user.owns
    if (typeof userSites === 'undefined') userSites = []
    userSites.push(siteid)

    db.collection('profiles').doc(uid).update({ owns: userSites })
    db.collection('sites').doc(siteid).collection('owners').doc(uid).set({ nick: user.nick })
  },
  removeOwner (context, { siteid, uid }) {
    const db = firebase.firestore()

    var user = context.getters.get(uid)
    var userSites = user.owns
    if (typeof userSites === 'undefined') userSites = []
    userSites = userSites.filter((site) => {
      if (site === siteid) return false
      return true
    })

    // console.log('removeOwner', uid, siteid, userSites)

    db.collection('profiles').doc(uid).update({ owns: userSites })
    db.collection('sites').doc(siteid).collection('owners').doc(uid).delete()
  }
}

export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
