<template>
  <v-container>
    <v-row>
      <v-col
        md="6"
        cols=12>
        <div style="text-align:center;padding:16px">
          <img alt="V" src="../assets/fox.svg" style="max-width: 128px"/>
        </div>
        <v-card>
          <v-card-title>{{$t('frontpage.title')}}</v-card-title>
          <v-card-text>
            <p><i>{{$t('frontpage.ingress')}}</i></p>
            <p>{{$t('frontpage.blurp')}}</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        md="6"
        cols="12">
        ...
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent } from '@vue/composition-api'
// import WikiText from '../components/WikiText.vue'
// import firebase from 'firebase/app'
// import 'firebase/firestore'

Vue.use(VueCompositionApi)

export default defineComponent({

})
</script>

<style lang="scss">
div.logo-image{
}
</style>
