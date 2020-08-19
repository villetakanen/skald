import Vue from 'vue'
import Vuetify from 'vuetify'
import VueCompositionApi from '@vue/composition-api'
import { Skaldfire } from './src/plugins/skaldfire'
import VueRouter from 'vue-router'

require('dotenv').config({ path: '.env.local' })

Vue.use(Vuetify)
Vue.use(VueCompositionApi)

// Firestore is initiated here!
Vue.use(Skaldfire)
