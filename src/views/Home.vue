<template>
  <div>

    <div style="text-align:center;padding:16px">
      <img alt="V" src="../assets/fox.svg" style="max-width: 128px"/>
    </div>

    <v-container>

      <v-row>
        <v-col
          cols="12">
          <SiteList count="4"/>
        </v-col>
        <v-col
          cols="12">
          <v-card>
            <v-card-text>
              <LatestChanges />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LatestChanges from '../components/LatestChanges'
import SiteList from '../components/SiteList'

export default {
  components: {
    LatestChanges,
    SiteList
  },
  mounted () {
    this.$store.dispatch('sites/openSite', 'skald')
    this.$store.dispatch('site/open', 'skald')
  }
}
</script>
