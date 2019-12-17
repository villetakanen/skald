<template>
  <v-container>
    <v-row v-if="isAuthorsProfile()">
      <v-col md='8'>
        <h1>{{nickname}}</h1>
        <v-card>
          <v-card-text>
            These are the Pages you have been working on!
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            These are the Sites you have been working on!
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md='4'>
        <h1>My Preferences</h1>
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
  methods: {
    isAuthorsProfile () {
      return this.$store.getters['author/nick']() === this.nickname
    }
  }
}
</script>
