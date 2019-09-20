<template>
  <div :class="theme">
    <div class="page-container">
      <v-container
        fluid
        grid-list-md>
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-card>
              <v-card-title>{{title}}</v-card-title>
              <v-card-text>
                <WikiText :content="content" :siteid="siteid"/>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
          <v-card>
            <v-card-text>
              <LatestChanges />
            </v-card-text>
          </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
import LatestChanges from '../components/LatestChanges'
import WikiText from '../components/WikiText'

export default {
  components: {
    LatestChanges,
    WikiText
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
    title () {
      if (this.$store.getters['binder/title']() === null) return ' '
      return this.$store.getters['binder/title']()
    },
    content () {
      if (this.$store.getters['binder/content']() === null) return ' '
      return this.$store.getters['binder/content']()
    },
    theme () {
      if (this.$store.getters['binder/theme']() === null) return 'Skald site-frontpage'
      return this.$store.getters['binder/theme']() + ' site-frontpage'
    }
  },
  methods: {
    updateSite (siteid) {
      // console.log('siteid', siteid, this.siteid)
      if (siteid === null || typeof siteid === 'undefined') siteid = 'skald'
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: siteid })
    }
  }
}
</script>
