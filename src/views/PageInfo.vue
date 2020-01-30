<template>
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
          <v-col>
            <TabTitle
              :sub="sitename + '/' + title"
              topic="Page Info"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-container>
                <PageHistoryList
                  :siteid='siteid'
                  :pageid='pageid'/>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import TabTitle from '../components/TabTitle.vue'
import PageHistoryList from '../components/page/PageHistoryList.vue'

export default {
  components: {
    TabTitle,
    Loading,
    PageHistoryList
  },
  props: [
    'pageid',
    'siteid'
  ],
  computed: {
    loading () {
      return this.$store.getters['binder/loading']()
    },
    sitename () {
      return this.$store.getters['site/name']()
    },
    title () {
      return this.$store.getters['binder/title']()
    }
  },
  methods: {
    update () {
      this.$store.dispatch('site/open', this.siteid)
      this.$store.dispatch('binder/openPage', { siteid: this.siteid, pageid: this.pageid })
      window.scroll(0, 0)
    }
  },
  created () {
    this.update()
  }
}
</script>
