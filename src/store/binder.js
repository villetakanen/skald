import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import _ from 'lodash'

const state = {
  title: null,
  content: null,
  pageid: null,
  siteid: null,
  loading: false,
  category: null,
  revisions: []
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
   * Returns true if binder is refreshing page content from firebase
   */
  loading: (context) => () => {
    return context.loading
  },
  revisions: (context) => () => {
    return context.revisions
  },
  category: (context) => () => {
    if (context.category === null) return '-'
    return context.category
  }
}
function setContent (context, content) {
  if (context.content === content) return
  Vue.set(context, 'content', content)
}
function setCategory (context, category) {
  if (category === '-' || category === '- none -') category = null
  Vue.set(context, 'category', category)
}
const mutations = {
  data (context, data) {
    Vue.set(context, 'title', data.name)
    setCategory(context, data.category)
    setContent(context, data.content)
  },
  category (context, category) {
    setCategory(context, category)
  },
  content (context, content) {
    setContent(context, content)
  },
  id (context, id) {
    Vue.set(context, 'pageid', id)
  },
  siteid (context, id) {
    Vue.set(context, 'siteid', id)
  },
  loading (context, bool) {
    Vue.set(context, 'loading', bool)
  },
  flush (context) {
    Vue.set(context, 'revisions', [])
  },
  revision (context, { key, revision }) {
    const rev = {
      id: key,
      author: revision.author,
      revision: revision.revision
    }
    const revisionsArray = context.revisions
    const index = _.findIndex(revisionsArray, { id: key })
    if (index > -1) revisionsArray[index] = rev
    else revisionsArray.push(rev)
    Vue.set(context, 'revisions', revisionsArray)
  },
  revisions (context, revisionsArray) {
    // Force empty arg, to empty array
    if (_.isEmpty(revisionsArray)) revisionsArray = []
    Vue.set(context, 'revisions', revisionsArray)
  }
}
const actions = {
  /**
   * Opens a wikipage: Sets binder.siteid
   * @param {vuex context} context Vuex context
   */
  openPage (context, { siteid, pageid, skiploading }) {
    if (!skiploading) context.commit('loading', true)
    // get the firestore
    const db = firebase.firestore()

    // get site reference
    const siteRef = db.collection('sites').doc(siteid)

    siteRef.get().then((doc) => {
      if (doc.exists) {
        const pageRef = siteRef.collection('pages').doc(pageid)
        pageRef.get().then((doc) => {
          if (doc.exists) {
            context.commit('data', doc.data())
            context.commit('siteid', siteid)
            context.commit('id', pageid)
            context.commit('loading', false)
          } else {
            context.commit('loading', false)
            // @todo: 404 - page does not exist
            context.commit('pageNotFound', pageid, { root: true })
            // context.commit('httpStatusCode', '404', { root: true })
          }
        })
      } else {
        context.commit('setLoading', false)
        // @todo: 404 - site does not exist
        context.commit('error', '404 - site does not exist', { root: true })
      }
    })
  },
  fetchRevisions (context) {
    // get the firestore
    const db = firebase.firestore()
    const revisionsRef = db.collection('sites').doc(context.state.siteid)
      .collection('pages').doc(context.state.pageid)
      .collection('revisions')

    revisionsRef.orderBy(firebase.firestore.FieldPath.documentId())
      .get().then((querySnapshot) => {
        context.commit('revisions', [])
        querySnapshot.forEach((revision) => {
          context.commit('revision', {
            key: revision.id,
            revision: revision.data()
          })
        })
      })
  },
  /**
   * Create a new page in Firebase Store
   *
   * @param {*} context vuex state
   * @param {*} param1 JSON for page data, see below
   */
  createPage (context, { pageid, name, content, siteid, author, nick }) {
    const np = {
      creator: author,
      creatorNick: nick,
      name: name,
      content: content,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    }

    const db = firebase.firestore()
    const siteRef = db.collection('sites').doc(siteid)
    const pageRef = siteRef.collection('pages').doc(pageid)
    pageRef.set(np).then((e) => {
      context.dispatch('pageLog/stamp', {
        authorNick: np.creatorNick,
        authorID: np.creator,
        action: 'create',
        pageid: pageid,
        siteid: siteid
      }, { root: true })
      // Binder state management: force open created page as the current page
      context.dispatch('openPage', { siteid: siteid, pageid: pageid })
    })
  },
  savePage (context, { pageid, name, content, siteid, author, nick }) {
    var u = {
      creator: author,
      creatorNick: nick,
      name: name,
      content: content,
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
    }
    context.commit('content', content)

    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)

    // let history = []

    pageRef.get().then((doc) => {
      if (doc.exists) {
        pageRef.collection('revisions').doc('' + doc.data().lastUpdate.seconds).set({
          author: doc.data().creatorNick,
          revision: doc.data().content
        })

        siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() })
        pageRef.update(u).then((e) => {
          context.dispatch('pageLog/stamp', {
            authorNick: u.creatorNick,
            authorID: author,
            action: 'update',
            pageid: pageid,
            siteid: siteid
          }, { root: true })
          // Binder state management: force open created page as the current page
          context.dispatch('openPage', {
            siteid: siteid,
            pageid: pageid,
            skiploading: true
          })
        })
      }
    })
  },
  deletePage (context, { pageid, siteid }) {
    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)

    pageRef.delete().then(() => {
    })
  },
  category (context, category) {
    console.log('setting category to', category, context.state.siteid, context.state.pageid)
    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(context.state.siteid)
    var pageRef = siteRef.collection('pages').doc(context.state.pageid)

    pageRef.update({ category: category }).then(() => {
      context.commit('category', category)
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
