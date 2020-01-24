<template>
  <v-container :class="theme">

    <v-row>
      <v-col>
        <TabTitle
          topic="Site Settings"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <SiteDescription/>
      </v-col>
      <v-col>
        <SitePoster :siteid="siteid"/>
      </v-col>
      <v-col
        cols='12'
        md='4'>
        <SiteTheme/>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols='12'
        md='4'>
        <SiteVisibility/>
      </v-col>
      <v-col
        cols='12'
        md='4'>
        <SiteOwners :siteid="siteid"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SiteOwners from '../components/SiteOwners.vue'
import SiteDescription from '../components/SiteDescription.vue'
import SitePoster from '../components/SitePoster.vue'
import SiteTheme from '../components/SiteTheme.vue'
import SiteVisibility from '../components/SiteVisibility.vue'
import TabTitle from '../components/TabTitle'

export default {
  components: {
    SiteOwners,
    SiteDescription,
    SitePoster,
    SiteTheme,
    SiteVisibility,
    TabTitle
  },
  props: [
    'siteid'
  ],
  created () {
    this.updateSite(this.siteid)
  },
  watch: {
    '$route' (to, from) {
      this.updateSite(this.siteid)
    }
  },
  computed: {
    titleColorClass () {
      if (this.$store.getters['site/titleColorClass']() === null) return ' '
      return this.$store.getters['site/titleColorClass']()
    },
    theme () {
      return this.$store.getters['site/theme']()
    }
  },
  methods: {
    updateSite (siteid) {
      if (siteid === null || typeof siteid === 'undefined') siteid = 'skald'

      // set site styles
      this.$store.dispatch('sites/openSite', siteid)
      this.$store.dispatch('site/open', siteid)
    }
  }
}
</script>
