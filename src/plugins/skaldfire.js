/**
 * This is a Firebase plugin for Skald
 *
 * We are providing our own plugin instead of the more accessible Vuefire
 * to control how the firebase cache is used and maintained within the
 * Skald
 */
import firebase from 'firebase/app'
import 'firebase/firestore'

/**
 * Replaces a String with a skald uri compatible slug
 * @param {string} s a String to be converted
 */
const skaldURI = function (s) {
  if (s === null) return null
  var re = new RegExp('[\\W]', 'g')
  var r = s.replace(re, '-')
  while (r.includes('--')) {
    r = r.split('--').join('-')
  }
  return r.toLowerCase()
}

/**
 * Caches FireStore urls
 */
const fileStoreURL = function (path) {
  let url = localStorage.getItem(path)
  if (!url) {
    const storage = firebase.storage()

    var pathRef = storage.ref(this.path)

    pathRef.getDownloadURL().then((newUrl) => {
      url = newUrl
      localStorage.setItem(path)
    }).catch(() => {
      return null
    })
  }
  return url
}

// This exports the plugin object.
export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install (Vue, options) {
    // Init Firebase with Env
    var config = {
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID
    }
    firebase.initializeApp(config)

    Vue.prototype.$skaldURI = skaldURI
    Vue.prototype.$fireStoreURL = fileStoreURL
  }
}
