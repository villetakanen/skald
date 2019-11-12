import Vue from 'vue'
import Vuex from 'vuex'
import metaBinder from './metaBinder.js'
import pageLog from './pageLog'
import binder from './binder'
import sites from './sites'
import author from './author'
import site from './site'
import users from './users'
import attachments from './attachments'

Vue.use(Vuex)

const state = {
  version: unescape(process.env.VERSION || '%7Bversion%3A0%7D'),
  pageNotFound: null,
  error: null
}
const getters = {
  /**
   * Returns the version number
   */
  version: (context) => () => {
    return context.version
  },
  /**
   * If the author module has a set UID, we should have an actual logged in user.
   *
   * Note: the value returned is intented to be used for visibility of the UX
   * elements, not for actual authentication requests
   */
  isAuthz: (context) => () => {
    return context.author.uid !== null
    // console.log(context.author)
    // return false
  },
  /**
   * 404 - we'll want to offer a way to create the page!
   */
  pageNotFound: (context) => () => {
    return context.pageNotFound
  },
  /**
   * Global error state
   */
  error: (context) => () => {
    return context.error
  }
}
const mutations = {
  error (context, error) {
    Vue.set(context, 'error', error)
  },
  pageNotFound (context, name) {
    Vue.set(context, 'pageNotFound', name)
  },
  clearErrors (context) {
    Vue.set(context, 'pageNotFound', null)
    Vue.set(context, 'error', null)
  }
}

export default new Vuex.Store({
  modules: {
    binder,
    metaBinder,
    pageLog,
    sites,
    author,
    site,
    users,
    attachments
  },
  state,
  getters,
  mutations,
  actions: {

  }
})
