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
export const skaldURI = function (s) {
  if (s === null) return null
  const re = new RegExp('[^a-öA-Ö0-9]', 'gmu')
  var r = s.replace(re, '-')
  while (r.includes('--')) {
    r = r.split('--').join('-')
  }
  return r.toLowerCase()
}

/**
 * Firestore URL fetching with cache
 */
const fireStoreURL = function (path) {
  return new Promise(function (resolve, reject) {
    const url = localStorage.getItem(path)
    if (url !== null) {
      resolve(url)
    }
    const storage = firebase.storage()
    const pathRef = storage.ref(path)
    pathRef.getDownloadURL().then((newUrl) => {
      localStorage.setItem(path, newUrl)
      if (!url) {
        resolve(newUrl)
      }
    }).catch((error) => {
      localStorage.removeItem(path)
      reject(error)
    })
  })
}

const toPageID = function (siteid, pageid) {
  if (pageid) return pageid
  else return this.toSiteID(siteid)
}

const toSiteID = function (siteid) {
  if (siteid) return siteid
  else return 'skald'
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

    /* Quite Boringly: we just enable this with the defaults, if the browser supports
       persistence. If it does not, an error is thrown here */
    firebase.firestore().enablePersistence()

    Vue.prototype.$skaldURI = skaldURI
    Vue.prototype.$fireStoreURL = fireStoreURL
    Vue.prototype.$toPageID = toPageID
    Vue.prototype.$toPageID = toSiteID
  }
}
