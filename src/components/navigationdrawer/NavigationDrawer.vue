<template>
  <v-list>
    <template v-if="siteid">
      <v-list-item :to="'/v/siteid'">
        <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
      <v-list-item-title >{{siteName}}</v-list-item-title>
      </v-list-item>
    </template>
    <v-list-item :to="'/'">
      <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
      <v-list-item-title >{{$t('navigation_to_skald_home')}}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, computed } from '@vue/composition-api'
Vue.use(VueCompositionApi)

export default defineComponent({
  setup () {
    const siteid = computed(() => 'temp')
    const siteName = computed(() => 'temp')
    return { siteid, siteName }
  }
})
</script>
