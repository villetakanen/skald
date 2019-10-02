<template>
  <div :class="theme">
    <div class="page-container">
      <v-container v-if="loading">
        <v-row>
          <v-col align='center'>
            <Loading/>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="!loading">
        <v-row>
        <v-col
            cols="8">
          <v-card>
            <v-toolbar
              dense
              flat
              style="border-bottom: 1px solid #232323">
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-btn
                v-if="isAuthz"
                color="secondary"
                small
                absolute
                bottom
                right
                fab
                v-bind:to="editlink"
                elevation="0">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <WikiText :content="content" :siteid="siteid"/>
            </v-card-text>
          </v-card>
          </v-col>
          <v-col cols="4">
            <v-card>
              <v-card-title>Sidebar</v-card-title>
              <v-card-text>
              <WikiText :content="sidebarContent" :siteid="siteid"/>
            </v-card-text>
            </v-card>
          </v-col>
          <v-col xs12>
          <v-card>
            <v-card-text>
              <LatestChanges />
            </v-card-text>
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import LatestChanges from '../components/LatestChanges'
import WikiText from '../components/WikiText'
import Loading from '../components/Loading'

export default {
  components: {
    LatestChanges,
    WikiText,
    Loading
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
    isAuthz () {
      return this.$store.getters['isAuthz']()
    },
    title () {
      if (this.$store.getters['binder/title']() === null) return ' '
      return this.$store.getters['binder/title']()
    },
    content () {
      if (this.$store.getters['binder/content']() === null) return ' '
      return this.$store.getters['binder/content']()
    },
    sidebarContent () {
      if (this.$store.getters['site/sidebarContent']() === null) return ' '
      return this.$store.getters['site/sidebarContent']()
    },
    theme () {
      if (this.$store.getters['binder/theme']() === null) return 'Skald reader'
      return this.$store.getters['binder/theme']() + ' reader'
    },
    loading () {
      return this.$store.getters['binder/loading']()
    },
    editlink () {
      return `/e/${this.siteid}/${this.pageid}`
    }
  },
  methods: {
    updatePage (siteid, pageid) {
      if (siteid === null || typeof siteid === 'undefined') siteid = 'skald'
      if (pageid === null || typeof pageid === 'undefined') pageid = siteid
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: pageid })

      // set site styles
      this.$store.dispatch('sites/openSite', siteid)
      this.$store.dispatch('site/open', siteid)
    }
  }
}
</script>
