import Vue from 'vue'
import Vuex from 'vuex'
import metaBinder from './metaBinder.js'
import pageLog from './pageLog'
import binder from './binder'

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
  }
}

export default new Vuex.Store({
  modules: {
    binder,
    metaBinder,
    pageLog
  },
  state,
  getters,
  mutations: {

  },
  actions: {

  }
})
