import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// Here it gets interesting: bring in the Firebase and our middleware
// import firebase from 'firebase/app'
import skaldfire from './plugins/skaldfire'

Vue.config.productionTip = false

// Firestore is initiated here!
Vue.use(skaldfire)

new Vue({
  router,
  store,
  vuetify,
  skaldfire,
  created: function () {
    // Fetch all base site pages to Vuex store
    store.dispatch('metaBinder/init')
    store.dispatch('pageLog/init')
    store.dispatch('sites/init')
  },
  render: h => h(App)
}).$mount('#app')
