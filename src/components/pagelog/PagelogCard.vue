<template>
  <v-card class="sidebar">
    <v-card-title>{{$t('pagelog.cardTitle')}}</v-card-title>
    <v-card-text>
      <PagelogList
        :siteid="'siteid'"
        :count="11"/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref } from '@vue/composition-api'
import PagelogList from './PagelogList.vue'
Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    PagelogList
  },
  props: {
    siteid: {
      type: [String],
      required: false
    }
  },
  setup (props) {
  }
})
</script>
