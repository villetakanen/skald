<template>
  <v-container>

    <v-row>
      <v-col>
        <TabTitle
          topic="Page list"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col
                cols='4'>
                <h1>All</h1>
                <ul>
                  <template v-for="(page, index) in pageIndex">
                    <li v-bind:key="index">
                      <router-link :to="`/v/${page.path}`">{{page.name}}</router-link></li>
                  </template>
                </ul>
              </v-col>
              <v-col
                cols='4'>
                <h1 v-if="characterIndex.length > 0">Characters</h1>
                <ul>
                  <template v-for="(page, index) in characterIndex">
                    <li v-bind:key="index">
                      <router-link :to="`/v/${page.path}`">{{page.name}}</router-link></li>
                  </template>
                </ul>
              </v-col>
              <v-col
                cols='4'>
                <h1 v-if="characterIndex.length > 0">Game Logs</h1>
                <ul>
                  <template v-for="(page, index) in gameLogIndex">
                    <li v-bind:key="index">
                      <router-link :to="`/v/${page.path}`">{{page.name}}</router-link></li>
                  </template>
                </ul>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabTitle from '../components/TabTitle'

export default {
  components: {
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
    pageIndex () {
      return this.$store.getters['site/pageIndex']()
    },
    characterIndex () {
      // @todo, these should be dynamic at some point maybe :D
      return this.$store.getters['site/pageIndex']('Character')
    },
    gameLogIndex () {
      // @todo, these should be dynamic at some point maybe :D
      return this.$store.getters['site/pageIndex']('Game Log')
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
