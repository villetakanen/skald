<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>Page not Found</v-card-title>
      <v-card-text>The page {{siteID}}/{{pageName}} was not found, do you want to create it?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="clearErrors">Cancel</v-btn>
        <v-btn color="primary" @click="createPage">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    siteID () {
      return this.$store.getters['binder/siteID']()
    },
    pageName () {
      return this.$store.getters['pageNotFound']()
    },
    dialog () {
      return this.$store.getters['pageNotFound']() !== null
    }
  },
  methods: {
    clearErrors () {
      this.$store.commit('clearErrors')
    },
    createPage () {
      this.$store.dispatch('binder/createPage',
        { pageid: this.pageName,
          name: this.pageName,
          content: '# ' + this.pageName,
          siteid: this.siteID,
          author: this.$store.getters['author/uid'](),
          nick: this.$store.getters['author/nick']()
        }
      )
      this.clearErrors()
    }
  }
}
</script>
