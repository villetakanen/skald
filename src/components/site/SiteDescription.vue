<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Site Info</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        id="saveDescriptionButton"
        v-if="isAuthz"
        @click="save">Save</v-btn>
    </v-toolbar>
    <v-card-text>
      <template v-if="!isAuthz">
        {{description}}
      </template>
      <v-form
        v-if="isAuthz"
        submit.prevent="saveDescription">

        <v-text-field
            v-model="siteName"
            label = "name"
            filled
            ></v-text-field>

        <v-text-field
            v-model="description"
            label = "description"
            filled
            ></v-text-field>

      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="secondary"
        text
        :to="'/archive/' + siteid"
        >View Full Contents</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    rawDescription: null,
    rawSiteName: null
  }),
  computed: {
    isAuthz () {
      return this.$store.getters.isAuthz()
    },
    description: {
      get () {
        if (this.rawDescription == null) {
          return this.$store.getters['site/description']()
        }
        return this.rawDescription
      },
      set (value) {
        this.rawDescription = value
      }
    },
    siteName: {
      get () {
        if (this.rawSiteName == null) {
          return this.$store.getters['site/name']()
        }
        return this.rawSiteName
      },
      set (value) {
        this.rawSiteName = value
      }

    },
    siteid () {
      return this.$store.getters['site/id']()
    }
  },
  methods: {
    save () {
      this.$store.dispatch('site/setInfo',
        {
          name: this.siteName,
          description: this.description
        })
    }
  }
}
</script>
