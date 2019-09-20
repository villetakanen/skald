<template>
  <v-container
    fluid
    grid-list-md>

    <v-layout row>

    <v-flex xs12 v-if="loading">
      <Loading/>
    </v-flex>

    <v-flex xs12>
      <v-card
        v-if="!loading"
        outlined>

      <v-toolbar
        dense>
        <v-toolbar-title>Editing {{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="primary" @click="savePage">save</v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form  @submit.prevent="savePage">
          <v-text-field
            v-model="title"
            filled></v-text-field>
          <v-textarea
            rows="10"
            outlined
            style="font-family: 'Source Code Pro', monospace;"
            v-model="content"></v-textarea>
        </v-form>
      </v-card-text>
    </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Loading from '../components/Loading'

export default {
  components: {
    Loading
  },
  props: [
    'pageid',
    'siteid'
  ],
  data: () => ({
    title: null,
    content: null
  }),
  computed: {
    loading () {
      return this.$store.getters['binder/loading']()
    }
  },
  created () {
    this.updatePage(this.siteid, this.pageid)
    this.$store.subscribe((mutation, state) => {
      // console.log(mutation.type)
      switch (mutation.type) {
        case 'binder/setData':
          this.title = this.$store.getters['binder/title']()
          this.content = this.$store.getters['binder/content']()
          break
      }
    })
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
    }
  },
  methods: {
    updatePage (siteid, pageid) {
      if (siteid === null || typeof siteid === 'undefined') siteid = 'skald'
      if (pageid === null || typeof pageid === 'undefined') pageid = siteid
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: pageid })
    },
    savePage () {
      this.$store.dispatch('binder/savePage',
        {
          siteid: this.siteid,
          pageid: this.pageid,
          name: this.title,
          content: this.content,
          author: this.$store.getters['author/uid'](),
          nick: this.$store.getters['author/nick']()
        })
      this.$router.push('/v/' + this.siteid + '/' + this.pageid)
    }
  }
}
</script>
