<template>
  <div :class="theme">
    <div class="page-container">
      <v-container
    fluid
    grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
          <v-card>
            <v-card-title>View Page</v-card-title>
            <v-card-text>
              <WikiText :content="content"/>
            </v-card-text>
          </v-card>
          </v-flex>
          <v-flex xs12>
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
    'pageid',
    'siteid'
  ],
  created () {
    this.updatePage(this.siteid, this.pageid)
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
    }
  },
  computed: {
    content () {
      if (this.$store.getters['binder/content']() === null) return ' '
      return this.$store.getters['binder/content']()
    },
    theme () {
      if (this.$store.getters['binder/theme']() === null) return 'Skald reader'
      return this.$store.getters['binder/theme']() + ' reader'
    }
  },
  methods: {
    updatePage (siteid, pageid) {
      if (siteid === null || typeof siteid === 'undefined') siteid = 'skald'
      if (pageid === null || typeof pageid === 'undefined') pageid = siteid
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: pageid })
    }
  }
}
</script>
