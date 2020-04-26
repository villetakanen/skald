import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import _ from 'lodash'
// const _ = require('lodash')

const state = {
  siteid: null,
  owners: {},
  members: {},
  data: {},
  sidebarContent: null,
  unsubscibe: () => {},
  unsubscibeOwners: () => {},
  unsubscibeMembers: () => {},
  unsubscibeSidebar: () => {},
  pages: {},
  unsubscibePages: () => {}
}

const getters = {
  id: (context) => () => {
    return context.siteid
  },
  sidebarContent: (context) => () => {
    return context.sidebarContent
  },
  owners: (context) => () => {
    return context.owners
  },
  members: (context) => () => {
    return context.members
  },
  isMember: (context) => (uid) => {
    return _.keys(context.members).includes(uid) || _.keys(context.owners).includes(uid)
  },
  description: (context) => () => {
    return context.data.description
  },
  pageIndex: (context) => (category) => {
    // console.log(context.pages)
    if (!category) return context.pages
    return _.filter(context.pages, ['category', category])
  },
  name: (context) => () => {
    if (!context.data.name) return context.siteid
    return context.data.name
  },
  titleColorClass: (context) => () => {
    if (!context.data.titleColorClass) return ''
    return context.data.titleColorClass
  },
  theme: (context) => () => {
    if (!context.data.theme) return 'Skald'
    return context.data.theme
  },
  hidden: (context) => () => {
    if (typeof context.data.hidden === 'undefined') return false
    return context.data.hidden
  },
  silent: (context) => () => {
    if (typeof context.data.hidden !== 'undefined' && context.data.hidden) return true
    return typeof context.data.silent !== 'undefined' && context.data.silent
  }
}

const mutations = {
  site (context, { siteid, data }) {
    Vue.set(context, 'siteid', siteid)
    Vue.set(context, 'data', data)
  },
  siteid (context, siteid) {
    Vue.set(context, 'siteid', siteid)
  },
  sidebar (context, { data }) {
    Vue.set(context, 'sidebarContent', data.content)
  },
  owners (context, owners) {
    if (!exists(owners)) owners = {}
    Vue.set(context, 'owners', owners)
  },
  members (context, members) {
    if (!exists(members)) members = {}
    Vue.set(context, 'members', members)
  },
  patchOwner (context, { id, data }) {
    // console.log('site/patchOwner', id, data)
    Vue.set(context.owners, id, data)
  },
  dropOwner (context, { id }) {
    Vue.delete(context.owners, id)
  },
  patchMember (context, { id, data }) {
    // console.log('site/patchOwner', id, data)
    Vue.set(context.members, id, data)
  },
  dropMember (context, { id }) {
    Vue.delete(context.members, id)
  },
  resetPageCache (context) {
    Vue.set(context, 'pages', {})
  },
  patchPage (context, { id, data }) {
    if (!data.path) data.path = context.siteid + '/' + id
    Vue.set(context.pages, id, data)
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
    if (siteid === context.getters.id()) {
      // Nothing to do, as the site is open.
      //
      // Please note: this actually means, that we need to listen to changes
      // for the open site, and not just get it once.
      return
    }

    // Force Vuex current site siteid to the one we are trying to open,
    // even if it does not exist in Firebase
    context.commit('siteid', siteid)

    // unsubscribe from previous site
    context.state.unsubscibe()
    context.state.unsubscibeOwners()
    context.state.unsubscibeMembers()
    context.state.unsubscibeSidebar()
    context.state.unsubscibePages()

    // reset all patched data
    context.commit('owners', null)
    context.commit('members', null)
    context.commit('resetPageCache')

    const db = firebase.firestore()

    const siteRef = db.collection('sites').doc(siteid)
    const ownersRef = siteRef.collection('owners')
    const membersRef = siteRef.collection('members')

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

    // Subscribe to owner data changes
    context.state.unsubscribeMembers = membersRef.onSnapshot((querySnapshot) => {
      // snapshot.docChanges().forEach(function(change)
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          context.commit('dropMember', { id: change.doc.id })
        } else {
          context.commit('patchMember', { id: change.doc.id, data: change.doc.data() })
        }
      })
    })

    // Subscribe to site pages
    context.state.unsubscribePages = siteRef.collection('pages').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        context.commit('patchPage', {
          id: change.doc.id,
          data: change.doc.data()
        })
      })
    })

    // Subscribe to site sidebar changes
    context.state.unsubscribeSidebar = siteRef.collection('pages').doc('sidebar').onSnapshot((doc) => {
      context.commit('sidebar', { data: doc.data() })
    })

    context.dispatch('attachments/fetch', { siteid: siteid }, { root: true })
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

  /**
   * Adds an user with uid and nick, to a owner of a site
   *
   * All permissions are checked by the firebase rules
   * @param {*} context Vuex context
   * @param {*} param1 { uid, nick }, where uid has to be an existing users uid
   */
  addOwner (context, { uid, nick }) {
    const siteid = context.state.siteid

    const db = firebase.firestore()
    const siteOwnerRef = db.collection('sites').doc(siteid).collection('owners').doc(uid)
    const siteMemberRef = db.collection('sites').doc(siteid).collection('members').doc(uid)
    const authorRef = db.collection('profiles').doc(uid)
    db.runTransaction((transaction) => {
      return transaction.get(authorRef).then((author) => {
        transaction.set(siteOwnerRef, { nick: nick })
        transaction.set(siteMemberRef, { nick: nick })
        let owns = []
        if (!author.owns || !author.owns.includes(siteid)) {
          if (author.owns) owns = author.owns
          owns.push(siteid)
          transaction.update(authorRef, { owns: owns })
        }
        let member = []
        if (!author.member || !author.member.includes(siteid)) {
          if (author.member) member = author.member
          member.push(siteid)
          transaction.update(authorRef, { member: member })
        }
        return Promise.resolve('done')
      })
    })
  },
  removeOwner (context, { uid }) {
    const siteid = context.state.siteid
    const db = firebase.firestore()
    const siteOwnerRef = db.collection('sites').doc(siteid).collection('owners').doc(uid)
    const authorRef = db.collection('profiles').doc(uid)

    db.runTransaction(async (transaction) => {
      const author = await transaction.get(authorRef)
      transaction.delete(siteOwnerRef)
      let owns = author.owns
      // Backwards compatible with site membership before 0.7.x
      if (!owns) {
        owns = []
      }
      _.pull(owns, siteid)
      transaction.update(authorRef, { owns: owns })
      return Promise.resolve('done')
    })
  },
  /**
   * Adds an user with uid and nick, to a owner of a site
   *
   * All permissions are checked by the firebase rules
   * @param {*} context Vuex context
   * @param {*} param1 { uid, nick }, where uid has to be an existing users uid
   */
  addMember (context, { uid, nick }) {
    const siteid = context.state.siteid

    const db = firebase.firestore()
    const siteMemberRef = db.collection('sites').doc(siteid).collection('members').doc(uid)
    const authorRef = db.collection('profiles').doc(uid)
    db.runTransaction((transaction) => {
      return transaction.get(authorRef).then((author) => {
        transaction.set(siteMemberRef, { nick: nick })
        let member = []
        if (!author.member || !author.member.includes(siteid)) {
          if (author.member) member = author.member
          member.push(siteid)
          transaction.update(authorRef, { member: member })
        }
        return Promise.resolve('done')
      })
    })
  },
  /**
   * Removes a membership of a Site from an author. This method does not touch owner status at all
   *
   * @param {*} context Vuex
   * @param {*} param1 {uid}, where uid has to be an existing users uid
   */
  removeMember (context, { uid }) {
    const siteid = context.state.siteid
    const db = firebase.firestore()
    const siteMemberRef = db.collection('sites').doc(siteid).collection('members').doc(uid)
    const authorRef = db.collection('profiles').doc(uid)

    db.runTransaction(async (transaction) => {
      const author = await transaction.get(authorRef)
      transaction.delete(siteMemberRef)
      let member = author.member
      // Backwards compatible with site membership before 0.7.x
      if (!member) {
        member = []
      }
      _.pull(member, siteid)
      transaction.update(authorRef, { member: member })
      return Promise.resolve('done')
    })
  },
  setInfo (context, { name, description }) {
    const siteid = context.state.siteid

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).update({
      name: name,
      description: description
    })
  },
  setTitleColor (context, titleColorClass) {
    const siteid = context.state.siteid

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).update({
      titleColorClass: titleColorClass
    })
  },
  setTheme (context, theme) {
    const siteid = context.state.siteid

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).update({
      theme: theme
    })
  },
  setHidden (context, hidden) {
    const siteid = context.state.siteid
    const hide = !!hidden

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).update({
      hidden: hide
    })
  },
  setSilent (context, silent) {
    const siteid = context.state.siteid
    const silence = !!silent

    const db = firebase.firestore()
    db.collection('sites').doc(siteid).update({
      silent: silence
    })
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
