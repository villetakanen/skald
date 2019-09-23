import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import Vue from 'vue'

const state = {
  list: {},
  owners: {},
  description: {},
  loading: false,
  currentSiteID: null,
  posterURL: null
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
  },
  description: (contex) => () => {
    return contex.description
  },
  posterURL: (context) => () => {
    return context.posterURL
  },
  sitePosterURL: (context) => (siteid) => {
    return context.list[siteid].fullPosterURL
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
  },
  setDescription (context, desc) {
    Vue.set(context, 'description', desc)
  },
  setPosterURL (context, url) {
    Vue.set(context, 'posterURL', url)
  },
  setSitePosterURL (context, { siteid, posterURL }) {
    console.log(posterURL)
    Vue.set(context.list[siteid], 'fullPosterURL', posterURL)
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

        if (doc.data().posterURL) {
          console.log('setting ', doc.data().posterURL)
          // Get a reference to the storage service, which is used to
          // create references in your storage bucket
          const storage = firebase.storage()
          var pathRef = storage.ref(doc.id + '/' + doc.data().posterURL)
          pathRef.getDownloadURL().then((url) => {
            context.commit('setSitePosterURL', { siteid: doc.id, posterURL: url })
          }).catch((err) => {
            this.message = doc.id + '/' + doc.data().posterUR + ' not found.'
            console.log(err.message)
          })
        } else {
          context.commit('setSitePosterURL', { siteid: doc.id, posterURL: null })
        }
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

    db.collection('sites').doc(siteid).get().then((doc) => {
      if (doc.exists) {
        context.commit('setDescription', doc.data().description)

        if (doc.data().posterURL) {
          // Get a reference to the storage service, which is used to
          // create references in your storage bucket
          const storage = firebase.storage()
          var pathRef = storage.ref(siteid + '/' + doc.data().posterURL)
          pathRef.getDownloadURL().then((url) => {
            context.commit('setPosterURL', url)
          }).catch((err) => {
            this.message = siteid + '/' + doc.data().posterUR + ' not found.'
            console.log(err.message)
          })
        } else {
          context.commit('setPosterURL', null)
        }
      }
    })

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
