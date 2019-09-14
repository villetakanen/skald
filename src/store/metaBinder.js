import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'

const state = {
  pages: {}
}

const getters = {
  page: (context) => (pageid) => {
    if (typeof context.pages[pageid] === 'undefined') return null
    return context.pages[pageid]
  }
}

const mutations = {
  setPage (context, { pageid, data }) {
    Vue.set(context.pages, pageid, data)
  }
}

const actions = {
  /**
   * Subscribe to the Firebase feed for pages of the site 'Skald'
   * @param {*} context Vuex context
   */
  init (context) {
    const db = firebase.firestore()
    // console.log('init', db)
    db.collection('sites').doc('skald').collection('pages').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        context.commit('setPage', { pageid: doc.id, data: doc.data() })
        // console.log('metaBinder got: ', doc.id)
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
