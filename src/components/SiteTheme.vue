<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Theme {{theme}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-radio-group
        v-model="theme">
        <v-radio
          label = "Skald (default)"
          value = "Skald"/>
        <v-radio
          label = "DD (Dungeons and Dragons)"
          value = "DD"/>
        <v-radio
          label = "Quick"
          value = "Quick"/>
        <v-radio
          label = "Hood"
          value = "Hood"/>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  /* data: () => ({
    theme: 'skald'
  }), */
  computed: {
    isAuthz () {
      return this.$store.getters['isAuthz']()
    },
    theme: {
      get () {
        return this.$store.getters['site/theme']()
      },
      set (theme) {
        this.$store.dispatch('site/setTheme', theme)
      }
    }
  }
}
</script>
