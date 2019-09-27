import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

const state = {
  siteid: null,
  owners: {},
  data: {},
  unsubscibe: () => {},
  unsubscibeOwners: () => {}
}

const getters = {
  id: (context) => () => {
    return context.siteid
  },
  owners: (context) => () => {
    return context.owners
  }
}

const mutations = {
  site (context, { siteid, data }) {
    Vue.set(context, 'siteid', siteid)
    Vue.set(context, 'data', data)
  },
  owners (context, owners) {
    if (!exists(owners)) owners = {}
    Vue.set(context, 'owners', owners)
  },
  patchOwner (context, { id, data }) {
    // console.log('site/patchOwner', id, data)
    Vue.set(context.owners, id, data)
  },
  dropOwner (context, { id }) {
    Vue.delete(context.owners, id)
  }
}

const actions = {
  /**
   * Opens a site, and starts listening for changess
   * @param {*} context Vuex context
   * @param {*} siteid Firestore sites UUID
   */
  open (context, siteid) {
    if (!exists(siteid)) throw new Error('invalid site id')
    if (siteid === context.getters['id']()) {
      // Nothing to do, as the site is open.
      //
      // Please note: this actually means, that we need to listen to changes
      // for the open site, and not just get it once.
      return
    }

    console.log('site/open', siteid)

    // unsubscribe from previous site
    context.state.unsubscibe()
    context.state.unsubscibeOwners()

    // reset all patched data
    context.commit('owners', null)

    const db = firebase.firestore()

    const siteRef = db.collection('sites').doc(siteid)
    const ownersRef = siteRef.collection('owners')

    // Subscribe to site data changes
    context.state.unsubscribe = siteRef.onSnapshot((doc) => {
      context.commit('site', { siteid: siteid, data: doc.data() })
    })

    // Subscribe to owner data changes
    context.state.unsubscribeOwners = ownersRef.onSnapshot((querySnapshot) => {
      // snapshot.docChanges().forEach(function(change)
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          context.commit('dropOwner', { id: change.doc.id })
        } else {
          context.commit('patchOwner', { id: change.doc.id, data: change.doc.data() })
        }
      })
    })
  },
  /* getOwners (context) {
    if (!exists(context.getters['id']())) throw new Error('A site is not opened, can not get owners')

    const db = firebase.firestore()
    const siteid = context.getters['id']()

    const ownersRef = db.collection('sites').doc(siteid).collection('owners')
    ownersRef.get().then((owners) => {
      context.commit('owners', null)
      var newOwners = {}
      owners.forEach((owner) => {
        newOwners[owner.id] = owner.data()
      })
      context.commit('owners', newOwners)
    })
  }, */
  addOwner (context, { nick }) {
    if (!exists(context.getters['id']())) return
    console.log('adding owner ', nick)
  },
  removeOwner (context, { nick }) {
    if (!exists(context.getters['id']())) return
    console.log('adding owner ', nick)
  }
}

function exists (value) {
  if (value === null || typeof value === 'undefined') return false
  return true
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
