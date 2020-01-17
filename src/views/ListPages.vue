<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="pagetitle">Page list</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <ul>
              <template v-for="(page, index) in pageIndex">
                <li v-bind:key="index">
                  <router-link :to="`/v/${page.path}`">{{page.name}}</router-link></li>
              </template>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
    pageIndex () {
      return this.$store.getters['site/pageIndex']()
    }
  },
  methods: {
    updateSite (siteid) {
      // console.log('siteid', siteid, this.siteid)
      if (siteid === null || typeof siteid === 'undefined') siteid = 'skald'
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: siteid })

      // set site styles
      this.$store.dispatch('sites/openSite', siteid)
      this.$store.dispatch('site/open', siteid)
    }
  }
}
</script>
