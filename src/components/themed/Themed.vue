<template>
  <div :class="`skald-themed ${theme}`">
    <slot></slot>
    <div id="debug">
      siteid: {{ siteid }} <br/>
      Theme: {{ theme }} <br/>
      Poster: {{ poster }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref, watch, onMounted } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useParams } from '../../lib/useParams'
Vue.use(VueCompositionApi)

export default defineComponent({
  setup (props) {
    const theme = ref('')
    const poster = ref('')
    const siteid = ref('')

    function setTheme (params) {
      siteid.value = params.siteid

      if (params.siteid) {
        const db = firebase.firestore()
        const siteRef = db.collection('sites').doc(params.siteid)
        siteRef.get().then((doc) => {
          if (doc.exists) {
            theme.value = doc.data().theme
            poster.value = doc.data().posterURL
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
    onMounted(() => { setTheme(params) })
    // route changed
    watch(params, setTheme)

    return { siteid, theme, poster }
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
