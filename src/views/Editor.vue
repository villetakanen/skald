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

        <v-btn icon @click="menuVisible=!menuVisible"><v-icon>mdi-menu</v-icon></v-btn>

        <v-btn color="primary"
          @click="savePage"
          id="save-editor-button">save</v-btn>
      </v-toolbar>
      <v-card-text>
        <div v-if="menuVisible" class="pagetools">
          <v-btn
            outlined
            @click="deletePageDialog=!deletePageDialog">Delete page</v-btn>
        </div>
        <v-form  @submit.prevent="savePage">
          <v-text-field
            v-model="title"
            filled></v-text-field>
          <v-textarea
            class="editor"
            :rows="rows"
            outlined
            style="font-family: 'Source Code Pro', monospace;"
            v-model="content"></v-textarea>
        </v-form>
      </v-card-text>
    </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="deletePageDialog"
      max-width="800px">
      <v-card>
        <v-card-title>Delete the page?</v-card-title>
        <v-card-text>There is no undo. The page will be gone for good.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="deletePage">Delete</v-btn>
          <v-btn
            color="primary"
            @click="deletePageDialog=!deletePageDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    content: null,
    menuVisible: false,
    deletePageDialog: false
  }),
  computed: {
    loading () {
      return this.$store.getters['binder/loading']()
    },
    rows () {
      if (window.innerWidth < 960) return 10
      return 20
    }
  },
  created () {
    if (!this.$store.getters.isAuthz()) {
      this.$router.push('/v/' + this.siteid + '/' + this.pageid)
      return
    }
    // If we reach this view without a page-id, we assume we want to
    // edit the root page of the site
    if (!this.pageid) this.pageid = this.siteid
    this.update()
    this.$store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'binder/data':
          this.title = this.$store.getters['binder/title']()
          this.content = this.$store.getters['binder/content']()
          break
      }
    })
  },
  watch: {
    '$route' (to, from) {
      this.updatePage()
    }
  },
  methods: {
    update () {
      this.$store.dispatch('site/open', this.siteid)
      this.$store.dispatch('binder/openPage', { siteid: this.siteid, pageid: this.pageid })
      window.scroll(0, 0)
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
    },
    deletePage () {
      this.$store.dispatch('binder/deletePage',
        {
          pageid: this.pageid,
          siteid: this.siteid
        }
      )
      this.$store.dispatch('pageLog/stamp',
        {
          action: 'delete',
          pageid: this.pageid,
          siteid: this.siteid,
          authorNick: this.$store.getters['author/nick'](),
          authorID: this.$store.getters['author/uid']()
        }
      )
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.pagetools{
  padding: 16px;
  background-color:RGBA(0,0,0, 0.2);
  min-height: 32px;
  margin: -16px;
  margin-bottom: 16px;
  text-align: right;
}
</style>
