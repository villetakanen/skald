import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  title: null,
  content: null,
  pageid: null,
  loading: false,
  revisions: {}
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
  }
}
const mutations = {
  data (context, data) {
    Vue.set(context, 'title', data.name)
    Vue.set(context, 'content', data.content)
    // Vue.set(context, 'revisions', data.history)
  },
  loading (context, bool) {
    Vue.set(context, 'loading', bool)
  },
  flush (context) {
    Vue.set(context, 'revisions', {})
  },
  revision (context, { key, revision }) {
    console.log(key, revision)
    Vue.set(context.revisions, key, revision)
    console.log(context.revisions)
  }
}
const actions = {
  /**
   * Opens a wikipage: Sets binder.siteid
   * @param {vuex context} context Vuex context
   */
  openPage (context, { siteid, pageid }) {
    context.commit('loading', true)
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
            context.commit('loading', false)
            pageRef.collection('revisions')
              .get().then((querySnapshot) => {
                context.commit('flush')
                console.log('flushed')
                querySnapshot.forEach((revision) => {
                  console.log('commits', revision.id)
                  context.commit('revision', {
                    key: revision.id,
                    revision: revision.data()
                  })
                })
              })
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
  /**
   * Create a new page in Firebase Store
   *
   * @param {*} context vuex state
   * @param {*} param1 JSON for page data, see below
   */
  createPage (context, { pageid, name, content, siteid, author, nick }) {
    // console.log('firestore create for', siteid, pageid, name, content, author, nick)

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

    // let history = []

    pageRef.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data().lastUpdate.seconds)
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
          context.dispatch('openPage', { siteid: siteid, pageid: pageid })
        })
      }
    })
  },
  deletePage (context, { pageid, siteid }) {
    const db = firebase.firestore()
    var siteRef = db.collection('sites').doc(siteid)
    var pageRef = siteRef.collection('pages').doc(pageid)

    pageRef.delete().then(() => {
      // console.log(`Document ${pageid} successfully deleted!`)
    })// .catch((error) => {
    // console.error('Error removing document: ', error)
    // })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
