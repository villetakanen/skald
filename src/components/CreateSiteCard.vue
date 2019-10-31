<template>
  <v-card>
    <v-card-title>Create a new Site</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <p>...</p>
            <v-text-field
              label="Site name"
              placeholder="A new site"
              filled
              v-model="name"
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            URL: <span style="color:#26a69a">mekanismi.web.app/#/v/{{newSiteid}}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        @click="create">Create</v-btn>
      <v-btn
        color="primary"
        outlined
        @click="cancel">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  methods: {
    cancel () {
      this.name = null
      this.$emit('closeDialog', true)
    },
    create () {
      this.$store.dispatch('sites/createSite',
        {
          siteid: this.newSiteid,
          name: this.newSiteid,
          owner: this.$store.state.creator.uid,
          ownerNick: this.$store.state.creator.nick
        })
      /* this.$store.dispatch('binder/createPage',
        {
          pageid: this.newSiteid,
          name: this.newSiteName,
          content: '# ' + this.newSiteName,
          siteid: this.newSiteid,
          creator: this.$store.state.creator.uid,
          creatorNick: this.$store.state.creator.nick
        })*/
      this.name = null
      this.$emit('closeDialog', true)
    }
  },
  computed: {
    name: {
      get () {
        return this.newSiteName
      },
      set (e) {
        this.newSiteName = e

        if (this.name === null) return null
        var re = new RegExp('[\\W]', 'g')
        var s = e.replace(re, '-')
        while (s.includes('--')) {
          s = s.split('--').join('-')
        }
        this.newSiteid = s
      }
    }
  },
  data: () => ({
    newSiteName: null,
    newSiteid: null
  })
}
</script>
