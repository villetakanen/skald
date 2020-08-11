<template>
  <div class="skald-themed">
    <slot></slot>
    <div id="debug">Theme {{ theme }}<br/>
      Poster: {{ poster }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref, watch } from '@vue/composition-api'
import { useParams } from '../../lib/useParams'
Vue.use(VueCompositionApi)

export default defineComponent({
  setup (props) {
    const theme = ref('skald')
    const poster = ref('')
    const params = useParams()
    function setTheme (siteid) {
      this.theme.value = siteid
      this.poster.value = siteid
    }
    watch(() => params.siteid, setTheme)
    return { theme, poster }
  }
})
</script>

<style lang="scss" scoped>
#debug{
  position: absolute;
  top: 16px;
  right: 16px;
  height: 128px;
  width: 720px;
  opacity: 0.75;
  background-color: black;
  color: greenyellow;
  z-index: 900000;
}
</style>
