<template>
  <v-container>
    <h1>Site settings</h1>
    <v-row>
      <v-col>
        <SiteOwners/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SiteOwners from '../components/SiteOwners.vue'
export default {
  components: {
    SiteOwners
  },
  props: [
    'siteid'
  ],
  created () {
    this.$store.dispatch('sites/openSite', this.siteid)
  }
}
</script>
