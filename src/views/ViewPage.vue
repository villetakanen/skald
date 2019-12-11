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
        <h1 class="sitelink">{{siteid}}</h1>
        <h1 class="pagetitle">{{title}}</h1>

        <v-row>

        <v-col
            cols="12"
            md="8">
          <div id="reader-text"><v-card>
            <v-card-text>
              <v-btn
                v-if="isAuthz"
                color="secondary"
                small
                absolute
                top
                right
                fab
                v-bind:to="editlink"
                elevation="2">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <WikiText :content="content" :siteid="siteid"/>
            </v-card-text>
          </v-card>
          </div>
          </v-col>

          <v-col
            cols="12"
            md="4">
            <v-card>
              <v-card-text>
                <div class="sidebar">
                  <WikiText :content="sidebarContent" :siteid="siteid"/>
                </div>
            </v-card-text>
              <v-card-actions v-if="isAuthz">
                <v-btn
                  text
                  color="primary"
                  :to="`/e/${siteid}/sidebar`">Edit sidebar</v-btn>
              </v-card-actions>
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

<style lang="scss">
h1.sitelink,
h1.pagetitle {
  text-shadow: 0px 0px 8px rgba(0,0,0,1);
  font-weight: 500;
}
h1.sitelink{
  font-size: 14px;
  line-height: 16px;
}
h1.pagetitle{
  font-size:28px;
}
</style>
