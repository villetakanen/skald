import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCompositionApi from '@vue/composition-api'
import { Skaldfire } from './src/plugins/skaldfire'

require('dotenv').config({ path: '.env.test.local' })

Vue.use(Vuetify)
Vue.use(VueCompositionApi)

// Firestore is initiated here!
Vue.use(Skaldfire)
