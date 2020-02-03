<template>
  <v-card>
    <v-card-title>New Page</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="Page name"
              placeholder="A new page"
              filled
              v-model="name"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            URL: <span style="color:#26a69a">mekanismi.web.app/#/v/{{siteid}}/{{newPageid}}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="cancel">Cancel</v-btn>
      <v-btn
        color="primary"
        @click="create">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    newPageName: null,
    newPageid: null
  }),
  computed: {
    siteid () {
      return this.$store.getters['site/id']()
    },
    name: {
      get () {
        return this.newPageName
      },
      set (stringName) {
        this.newPageid = this.$skaldURI(stringName)
        this.newPageName = stringName
      }
    }
  },
  methods: {
    cancel () {
      this.name = null
      this.$emit('closeDialog', true)
    },
    create () {
      this.$store.dispatch('binder/createPage',
        {
          content: this.newPageName,
          siteid: this.siteid,
          pageid: this.newPageid,
          name: this.newPageName,
          author: this.$store.getters['author/uid'](),
          nick: this.$store.getters['author/nick']()
        })
      this.name = null
      this.$emit('closeDialog', true)
      this.$router.push('/v/' + this.siteid + '/' + this.newPageid)
    }
  }
}
</script>
