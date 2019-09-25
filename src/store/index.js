import Vue from 'vue'
import Vuex from 'vuex'
import metaBinder from './metaBinder.js'
import pageLog from './pageLog'
import binder from './binder'
import sites from './sites'
import author from './author'
import site from './site'

Vue.use(Vuex)

const state = {
  version: unescape(process.env.VERSION || '%7Bversion%3A0%7D')
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
  }
}

export default new Vuex.Store({
  modules: {
    binder,
    metaBinder,
    pageLog,
    sites,
    author,
    site
  },
  state,
  getters,
  mutations: {

  },
  actions: {

  }
})
