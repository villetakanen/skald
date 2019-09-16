import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  all: []
}
const getters = {
  /**
   * Returns pagelog
   */
  latest: (context) => () => {
    return context.all.slice(0, 10)
  }
}
const mutations = {
  patchLog (context, { data }) {
    // Add to all if not found
    if (context.all.length === 0) context.all.push(data)
    else {
      var filtered = context.all.filter((value, index, arr) => {
        if ((value.siteid + '.' + value.pageid) === (data.siteid + '.' + data.pageid)) {
          return false
        }
        return true
      })
      // filtered = filtered.reverse()
      filtered.push(data)
      // filtered = filtered.reverse()
      Vue.set(context, 'all', filtered)
    }
  }
}
const actions = {
  init (context) {
    // console.log('pagelog/init')

    const db = firebase.firestore()

    db.collection('pagelog').orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        context.commit('patchLog', { data: doc.data() })
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
