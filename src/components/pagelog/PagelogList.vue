<template>
  <v-card class="sidebar">
    <v-card-title>{{$t('pagelog.card-title')}}</v-card-title>
    <v-card-text>
      <PagelogItem
        :siteid="'siteid'"
        :count="11"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref } from '@vue/composition-api'
import PagelogItem from './PagelogItem.vue'
Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    PagelogItem
  },
  props: {
    siteid: {
      type: [String],
      required: false
    }
  },
  setup (props) {
    const siteid = ref('')
    if (props.siteid) siteid.value = props.siteid
    return { siteid }
  }
})
</script>
