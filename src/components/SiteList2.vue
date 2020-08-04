<template>
  <v-container>
    <div>Props: {{count}} {{paging}} {{cols}}</div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, onMounted, ref } from '@vue/composition-api'

Vue.use(VueCompositionApi)

export default defineComponent({
  props: {
    count: {
      type: [Number],
      required: false
    },
    paging: {
      type: [Boolean],
      required: false
    },
    cols: {
      type: [Number],
      required: false
    }
  },
  setup (props) {
    const allSites = ref([])
    const visibleSites = ref([])
    onMounted(() => {
    })
    return { allSites, visibleSites }
  }
})
</script>
