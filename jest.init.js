import Vue from 'vue'
import Vuetify from 'vuetify'
import { Skaldfire } from './src/plugins/skaldfire'

require('dotenv').config({ path: '.env.development.local' })

Vue.use(Vuetify)

// Firestore is initiated here!
Vue.use(Skaldfire)
