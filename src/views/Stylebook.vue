<template>
  <div>

    <div class="style-book-chapter">
      <p>This is a stylebook, with all elements we use shown, for UX design and verification</p>
    </div>

    <v-container fluid>
      <v-layout wrap>
        <v-flex xs12 md6>
          <v-card>
            <v-card-text>
              <PagelogEntry
                action="update"
                creator="Updater Nick"
                pageid="pageid"
                siteid="siteid"
                :date="defaultDate"/>
              <PagelogEntry
                action="create"
                creator="Creator Nick"
                pageid="pageid"
                siteid="siteid"
                :date="defaultDate"/>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card>
    <v-card-title>Latest changes</v-card-title>
    <v-card-text>
    <template v-for="(page, index) in latestChanges">
      <PagelogEntry v-bind:key="index"
                :action="page.action"
                :creator="page.creator"
                :pageid="page.pageid"
                :siteid="page.siteid"
                :date="toDate(page.timestamp.seconds)"/>
    </template>
    </v-card-text>
  </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="style-book-chapter">
      <v-layout wrap>
        <v-flex xs12 md4>
          <p>Theme: Skald</p>
          <WikiText theme="Skald" :content="defaultContent"/>
        </v-flex>
        <v-flex xs12 md4>
          <p>Theme: Hood</p>
          <WikiText theme="Hood" :content="defaultContent"/>
        </v-flex>
        <v-flex xs12 md4>
          <p>Theme: Quick</p>
          <WikiText theme="Quick" :content="defaultContent"/>
        </v-flex>
      </v-layout>
    </div>

    <div class="style-book-chapter">
      <v-btn>v-btn</v-btn>
    </div>
    <div class="style-book-chapter">
      <v-btn color="primary">v-btn primary</v-btn>
    </div>
    <div class="style-book-chapter">
      <v-btn color="secondary">v-btn secondary</v-btn>
    </div>
    <div class="style-book-chapter">
      <v-btn dark>v-btn dark</v-btn>
    </div>

  </div>
</template>
<script>
import WikiText from '../components/WikiText'
import PagelogEntry from '../components/PagelogEntry'

export default {
  components: {
    WikiText,
    PagelogEntry
  },
  data: () => ({
    defaultDate: new Date()
  }),
  computed: {
    defaultContent () {
      const page = this.$store.getters['metaBinder/page']('example-wikipage')
      if (page === null) return ''
      return page.content
    },
    latestChanges () {
      return this.$store.getters['pageLog/latest']()
    }
  },
  methods: {
    toDate (seconds) {
      if (seconds === null || typeof seconds === 'undefined') return '...'
      var lastChangeDate = new Date(1970, 0, 1) // Epoch
      lastChangeDate.setSeconds(seconds)
      const s = lastChangeDate.toISOString().split('T')
      return s[0] + ' ' + s[1].substring(0, 8)
    }
  }
}
</script>
<style scoped>
div.style-book-chapter{
  margin: 8px;
  padding: 8px;
  background-color: white;
  /* border: solid 1px #e2e2e2; */
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.28);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.28);
  box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.28);
}
</style>
