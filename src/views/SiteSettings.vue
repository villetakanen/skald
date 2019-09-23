<template>
  <v-container>
    <h1>Site settings</h1>
    <v-row>
      <v-col>
        <SiteOwners/>
      </v-col>
      <v-col>
        <SiteDescription/>
      </v-col>
      <v-col>
        <SitePoster :siteid="siteid"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SiteOwners from '../components/SiteOwners.vue'
import SiteDescription from '../components/SiteDescription.vue'
import SitePoster from '../components/SitePoster.vue'

export default {
  components: {
    SiteOwners,
    SiteDescription,
    SitePoster
  },
  props: [
    'siteid'
  ],
  created () {
    this.$store.dispatch('sites/openSite', this.siteid)
  }
}
</script>
