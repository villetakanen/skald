<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Description</v-toolbar-title>
    </v-toolbar>
    <v-card-text>{{description}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    description () {
      return this.$store.getters['sites/description']()
    }
  }
}
</script>
