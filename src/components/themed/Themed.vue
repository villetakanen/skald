<template>
  <div :class="`skald-themed ${theme}`">
    <slot></slot>
    <div id="debug">
      siteid: {{ siteid }} <br/>
      Theme: {{ theme }} <br/>
      Poster: {{ poster }} <br/>
      PosterImageURL: {{ posterImageURL }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref, watch, onMounted, computed } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useParams } from '../../lib/useParams'
import { fireStoreURL } from '../../plugins/skaldfire'
Vue.use(VueCompositionApi)

export default defineComponent({
  setup (props) {
    const theme = ref('')
    const poster = ref('')
    const siteid = ref('')
    const posterImageURL = ref('')

    function setTheme (params) {
      siteid.value = params.siteid

      if (params.siteid) {
        const db = firebase.firestore()
        const siteRef = db.collection('sites').doc(params.siteid)
        siteRef.get().then((doc) => {
          if (doc.exists) {
            theme.value = doc.data().theme
            const p = doc.data().posterURL
            poster.value = p
            if (p) {
              fireStoreURL(params.siteid + '/' + p).then((url) => {
                if (typeof url === 'string') posterImageURL.value = url
              })
            }
          }
        })
      } else {
        theme.value = ''
        poster.value = ''
      }
    }
    // useParams, and set theme based on the site opened
    const params = useParams()
    // reload/remount etc
    onMounted(() => { setTheme(params.value) })
    // route changed
    watch(params, setTheme)

    return { siteid, theme, poster, posterImageURL }
  }
})
</script>

<style lang="scss" scoped>
#debug{
  position: absolute;
  top: 16px;
  right: 16px;
  height: 128px;
  width: 256px;
  opacity: 0.75;
  background-color: black;
  color: greenyellow;
  z-index: 900000;
  padding: 8px;
}
</style>
