import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  content: null,
  pageid: null,
  siteid: null,
  theme: null
  // unsubscribe: null
}
const getters = {
  /**
   * Returns content for this page
   */
  content: (context) => () => {
    if (context.content === null) return '-'
    return context.content
  },
  /**
   * Returns theme for current site
   */
  theme: (context) => () => {
    return context.theme
  }
}
const mutations = {
  setSiteid (context, siteid) {
    Vue.set(context, 'siteid', siteid)
  },
  setContent (context, content) {
    Vue.set(context, 'content', content)
  },
  setTheme (context, theme) {
    Vue.set(context, 'theme', theme)
  }
}
const actions = {
  /**
   * Opens a wikipage: Sets binder.siteid
   * @param {vuex context} context Vuex context
   */
  openPage (context, { siteid, pageid }) {
    // get the firestore
    const db = firebase.firestore()

    console.log('openPage', siteid, pageid)

    // get site reference
    const siteRef = db.collection('sites').doc(siteid)
    siteRef.get().then((doc) => {
      if (doc.exists) {
        context.commit('setSiteid', siteid)
        context.commit('setTheme', doc.data().theme)
        const pageRef = siteRef.collection('pages').doc(pageid)
        pageRef.get().then((doc) => {
          if (doc.exists) {
            context.commit('setContent', doc.data().content)
          } else {
            // @todo: 404 - page does not exist
            console.log('TODO: 404 - page does not exist')
            // context.commit('httpStatusCode', '404', { root: true })
          }
        })
      } else {
        // @todo: 404 - site does not exist
        console.log('TODO: 404 - site does not exist')
      }
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
