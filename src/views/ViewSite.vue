<template>
  <div :class="theme">
    <div class="page-container">
      <v-container
        fluid
        grid-list-md>
        <v-row>
          <v-col id="sitehead">
            <h1 id="sitetitle">{{title}}</h1>
            <p id="sitedescription">{{description}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="8"
            sm="12"
            xs="12">
            <v-card>
              <v-card-text>
                <WikiText :content="content" :siteid="siteid"/>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="4"
            sm="12"
            xs="12">
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

        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            xs="12">
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
    sidebarContent () {
      if (this.$store.getters['site/sidebarContent']() === null) return ' '
      return this.$store.getters['site/sidebarContent']()
    },
    description () {
      if (this.$store.getters['sites/description']() === null) return ' '
      return this.$store.getters['sites/description']()
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

      // set site styles
      this.$store.dispatch('sites/openSite', siteid)
      this.$store.dispatch('site/open', siteid)
    }
  }
}
</script>
