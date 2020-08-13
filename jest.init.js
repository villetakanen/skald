import Vue from 'vue'
import Vuetify from 'vuetify'
import { Skaldfire } from './src/plugins/skaldfire'

require('dotenv').config({ path: '.env.development.local' })

Vue.use(Vuetify)

console.log('a', process.env.VUE_APP_FIREBASE_API_KEY)

// Firestore is initiated here!
Vue.use(Skaldfire)
