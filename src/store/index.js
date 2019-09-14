import Vue from 'vue'
import Vuex from 'vuex'
import metaBinder from './metaBinder.js'

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
    metaBinder
  },
  state,
  getters,
  mutations: {

  },
  actions: {

  }
})
