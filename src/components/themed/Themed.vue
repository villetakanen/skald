<template>
  <div :class="`skald-themed ${theme}`">
    <!-- default background -->
    <div
      id="cover"
      :style="`height: ${posterHeight}px`"
      v-if="!poster">
      <div id="posterFadeOut"
        :style="`min-height: ${posterHeight/4}px`"></div>
    </div>
    <!-- site background -->
    <div
      id="cover"
      v-if="poster"
      :style="`height: ${posterHeight}px; background-image:url('${posterImageURL}')`">
      <div id="posterFadeOut"
        :style="`min-height: ${posterHeight/4}px`"></div>
    </div>

    <slot></slot>
    <!--div id="debug">
      siteid: {{ siteid }} <br/>
      Theme: {{ theme }} <br/>
      Poster: {{ poster }} <br/>
      PosterImageURL: {{ posterImageURL }} <br/>
      PosterHeight: {{ posterHeight }}
    </div-->
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
    const posterHeight = ref(window.innerHeight)

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

    return { siteid, theme, poster, posterImageURL, posterHeight }
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
// Cover image positioning and scaffold
div#cover{
  position: absolute;
  width: 100%;
  min-height: 300px;
  background-image: url('../../assets/skald-poster.svg');
  background-size: cover;
}
div#posterFadeOut{
  position: absolute;
  width: 100%;
  bottom: 0;
  background: linear-gradient(0deg, rgba(35,35,35,1) 0%, rgba(35,35,35,0) 100%);
}
</style>
