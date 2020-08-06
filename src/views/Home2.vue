<template>
  <v-container>
    <v-row>
      <v-col
        cols=12>
        <div class="logo-image">
          <img alt="V" src="../assets/fox.svg" style="max-width: 128px"/>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        md="6"
        cols="12">
        <v-card>
          <v-card-title>{{$t('frontpage.title')}}</v-card-title>
          <v-card-text>
            <p><i>{{$t('frontpage.ingress')}}</i></p>
            <p>{{$t('frontpage.blurp')}}</p>
          </v-card-text>
        </v-card>
        <v-card class="my-2">
          <v-card-text>
            <LatestChanges/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        md="6"
        cols="12">
        <SiteList
          :cols='2'
          :count='8'
          paging />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent } from '@vue/composition-api'
import SiteList from '../components/SiteList2.vue'
// import TabTitle from '../components/TabTitle.vue'
import LatestChanges from '../components/LatestChanges.vue'
// import WikiText from '../components/WikiText.vue'
// import firebase from 'firebase/app'
// import 'firebase/firestore'

Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    SiteList,
    // TabTitle,
    LatestChanges
  }

})
</script>

<style lang="scss">
div.logo-image{
  text-align:center;
  padding:16px;
}
</style>
