<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Privacy</v-toolbar-title>
     </v-toolbar>
    <v-card-text>
      <div>
      <v-btn
        @click="hidden=!hidden"
        icon>
        <v-icon v-if="!hidden">mdi-eye</v-icon>
        <v-icon v-if="hidden">mdi-eye-off</v-icon>
    </v-btn> Site
      <span v-if="!hidden">visible in</span>
      <span v-if="hidden">hidden from</span> listings
    </div>
    <div>
      <v-btn
        :disabled="hidden"
        @click="silent=!silent"
        icon>
        <v-icon v-if="!silent">mdi-comment</v-icon>
        <v-icon v-if="silent">mdi-comment-remove</v-icon>
    </v-btn> Site
      <span v-if="!silent">posts to</span>
      <span v-if="silent">silent in</span> logs
    </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    hidden: {
      get () {
        return this.$store.getters['site/hidden']()
      },
      set (hide) {
        this.$store.dispatch('site/setHidden', hide)
      }
    },
    silent: {
      get () {
        return this.$store.getters['site/silent']()
      },
      set (hide) {
        this.$store.dispatch('site/setSilent', hide)
      }
    }
  }
}
</script>
