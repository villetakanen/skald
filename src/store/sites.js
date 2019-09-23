import firebase from 'firebase/app'
import 'firebase/firestore'
import Vue from 'vue'

const state = {
  list: {},
  owners: {},
  loading: false
}
const getters = {
  /**
   * Returns pagelog (filtered with user if needed)
   */
  list: (context) => () => {
    return context.list
  },
  owners: (context) => () => {
    return context.owners
  }
}
const mutations = {
  /**
     * Adds a Site to site listing, with doc.key as it's JSON key value with
     * Vue.set() to force the refresh of the object
     * @param {*} state Vuex store.state
     * @param {*} param1 firebase Sites json { doc.key(), doc.data() }
     */
  patchSite (state, { key, data }) {
    if (data.link === null ||
      typeof data.link === 'undefined') {
      data.link = key + '.' + key
    }
    // console.log('patching site', key, data)
    // console.log(state.list)
    Vue.set(state.list, key, data)
    // console.log(state.list[key])
  },
  flushOwners (context) {
    Vue.set(context, 'owners', {})
  },
  patchOwners (state, { key, data }) {
    Vue.set(state.owners, key, data)
  }
}
const actions = {
  /**
     * Updates store.Sites metadata from firebase snapshot
     * @param {*} contex Vuex context
     */
  init (context) {
    const db = firebase.firestore()
    db.collection('sites').orderBy('lastUpdate', 'desc').onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log('getSites() is adding to sites :', doc.id, doc.data())
        context.commit('patchSite', { key: doc.id, data: doc.data() })
      })
    })
  },
  /**
   * Opens a site for editing, viewing - with all child attributes
   * @param {*} siteid firebase id for the site
   */
  openSite (context, siteid) {
    const db = firebase.firestore()

    // context.commit('loading', true)
    context.commit('flushOwners')

    db.collection('sites').doc(siteid).collection('owners').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        context.commit('patchOwners', { key: doc.id, data: doc.data() })
      })
      // context.commit('loading', false)
    })
  }
}
export default {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}
