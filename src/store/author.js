import Vue from 'vue'

const state = {
  uid: null
}
const mutations = {
  setUid (context, uid) {
    Vue.set(context, 'uid', uid)
  }
}
const actions = {
  login (context, user) {
    console.log('author/login', user)
    context.commit('setUid', user.uid)
  },
  logout (context, user) {
    console.log('author/logout', user)
    if (context.state.uid !== null) context.commit('setUid', null)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
