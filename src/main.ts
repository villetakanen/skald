import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './i18n'

// Here it gets interesting: bring in the Firebase and our middleware
import firebase from 'firebase/app'
import { Skaldfire } from './plugins/skaldfire'

Vue.config.productionTip = false

// Firestore is initiated here!
Vue.use(Skaldfire)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  created: function () {
    // Fetch all base site pages to Vuex store
    store.dispatch('metaBinder/init')
    store.dispatch('pageLog/init')
    store.dispatch('sites/init')
    store.dispatch('users/init')

    // get signed in profile, and update Vuex state accordingly
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.dispatch('author/login', user)
      } else {
        store.dispatch('author/logout', user)
      }
    })

    this.$store.subscribe((mutation, state) => {
      // After login, or theme switch, the vuetify theme is set to author/theme
      // as a mutation, we need to listen to it here to catch that switch
      if (mutation.type === 'author/theme') {
        this.$vuetify.theme.dark = state.author.theme
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
