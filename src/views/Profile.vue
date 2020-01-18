<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="pagetitle">Your Personal Settings and Profile</h1>
      </v-col>
    </v-row>
    <v-row v-if="isAuthorsProfile()">
      <v-col md='4'>
        <v-card>
          <v-card-text>
            <v-switch
              v-model="vuetifyTheme"
              color="primary"
              label="Use Dark Theme"></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md='4'>
        <v-card>
          <v-card-text>
            <h1>Pages I have been working on</h1>
            <template v-for="(logentry, index) in pageLog">
              <p :key='index'>{{logentry.id}}</p>
            </template>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            These are the Sites you have been working on!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md='4'>
        <v-card>
          <v-card-text>
            Here you can set theme to either light or dark!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!isAuthorsProfile()">
      <v-col>
        <h1>The profile page requires a logged in Author</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    'nickname'
  ],
  data: () => ({
    darkTheme: true
  }),
  computed: {
    pageLog () {
      return this.$store.getters['author/pageLog']()
    },
    vuetifyTheme: {
      get () {
        return this.$vuetify.theme.dark
      },
      set (value) {
        // The main.js will update author/theme accordingly every time
        // it is changed, so we do not need to do it here
        this.$store.dispatch('author/theme', value)
      }
    }
  },
  methods: {
    isAuthorsProfile () {
      return this.$store.getters['author/nick']() === this.nickname
    }
  }
}
</script>
