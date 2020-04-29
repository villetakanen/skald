import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#039be5',
        secondary: '#fbc02d',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        primary: '#039be5',
        secondary: '#fbc02d'
        // primary: '#455a64',
        // secondary: '#e91e63'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
