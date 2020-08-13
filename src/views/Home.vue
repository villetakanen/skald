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
        <SiteList
          :cols='1'
          :count='8'
        />
        <div style="text-align:center;padding:8px">
          <v-btn
            text
            color="primary"
            to="/l/sites"
            >{{$t('frontpage.fullSiteListingButton')}}</v-btn>
        </div>
      </v-col>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent } from '@vue/composition-api'
import SiteList from '../components/SiteList.vue'
import LatestChanges from '../components/LatestChanges.vue'

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
