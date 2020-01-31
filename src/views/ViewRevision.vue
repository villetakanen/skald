<template>
  <div>
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
              :sub="sitename"
              :topic="title"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            md="8"
            cols="12">
            <v-card>
                <v-container>
                  <WikiText :content="revision" :siteid="siteid"/>
                </v-container>
            </v-card>
          </v-col>
          <v-col
            md="4"
            cols="12">
            <v-card>
              <v-container>
                <h3>Actions</h3>
                <router-link :to="'/v/' + siteid + '/' + pageid">Back to the page</router-link>
                <PageHistoryList
                  :siteid='siteid'
                  :pageid='pageid'/>
                </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import TabTitle from '../components/TabTitle.vue'
import PageHistoryList from '../components/page/PageHistoryList.vue'
import WikiText from '../components/WikiText.vue'
import _ from 'lodash'

export default {
  components: {
    WikiText,
    TabTitle,
    Loading,
    PageHistoryList
  },
  props: [
    'pageid',
    'siteid',
    'revisionid'
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
    },
    revision () {
      const revisions = this.$store.getters['binder/revisions']()
      const chosen = _.find(revisions, { id: this.revisionid })
      if (!chosen) return ' '
      return chosen.revision
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
