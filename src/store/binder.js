import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  title: null,
  content: null,
  pageid: null,
  siteid: null,
  theme: null,
  loading: false
  // unsubscribe: null
}
const getters = {
  /**
   * Returns content for this page
   */
  title: (context) => () => {
    return context.title
  },
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
  },
  /**
   * Returns true if binder is refreshing page content from firebase
   */
  loading: (context) => () => {
    return context.loading
  },
  /**
   * Returns true if binder is refreshing page content from firebase
   */
  siteID: (context) => () => {
    return context.siteid
  }
}
const mutations = {
  setSiteid (context, siteid) {
    Vue.set(context, 'siteid', siteid)
  },
  setData (context, data) {
    Vue.set(context, 'title', data.name)
    Vue.set(context, 'content', data.content)
  },
  setTheme (context, theme) {
    Vue.set(context, 'theme', theme)
  },
  setLoading (context, bool) {
    Vue.set(context, 'loading', bool)
  }
}
const actions = {
  /**
   * Opens a wikipage: Sets binder.siteid
   * @param {vuex context} context Vuex context
   */
  openPage (context, { siteid, pageid }) {
    context.commit('setLoading', true)
    // get the firestore
    const db = firebase.firestore()

    // get site reference
    const siteRef = db.collection('sites').doc(siteid)
    siteRef.get().then((doc) => {
      if (doc.exists) {
        context.commit('setSiteid', siteid)
        context.commit('setTheme', doc.data().theme)
        const pageRef = siteRef.collection('pages').doc(pageid)
        pageRef.get().then((doc) => {
          if (doc.exists) {
            context.commit('setData', doc.data())
            context.commit('setLoading', false)
          } else {
            // @todo: 404 - page does not exist
            context.commit('error', '404 - page does not exist', { root: true })
            // context.commit('httpStatusCode', '404', { root: true })
          }
        })
      } else {
        // @todo: 404 - site does not exist

      }
    })
  },
  savePage (context, { pageid, name, content, siteid,
    author, nick }) {
    // console.log('updating firestore for', siteid, pageid, name, content, author, nick)

    var u = {
      creator: author,
      creatorNick: nick,
      name: name,
      content: content,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)
    siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() })
    pageRef.update(u).then((e) => {
      context.dispatch('pageLog/stamp', {
        creator: u.creatorNick,
        action: 'update',
        pageid: pageid,
        siteid: siteid }, { root: true })
      // Binder state management: force open created page as the current page
      context.dispatch('openPage', { siteid: siteid, pageid: pageid })
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
