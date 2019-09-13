<template>
  <v-list>
    <v-subheader>Meta</v-subheader>
    <v-list-item :to="'/'">
      <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>

      <v-list-item-title >Home</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/v/skald/beta-about'">
      <v-list-item-action><v-icon>mdi-information-outline</v-icon></v-list-item-action>

      <v-list-item-title >About</v-list-item-title>
    </v-list-item>
    <v-list-item href="https://github.com/vitku/skald">
      <v-list-item-action><v-icon>mdi-language-javascript</v-icon></v-list-item-action>
      <v-list-item-title>GitHub</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/v/skald/beta-backlog'">
      <v-list-item-action><v-icon>mdi-cup-water</v-icon></v-list-item-action>

      <v-list-item-title >{{version}}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  computed: {
    version () {
      return this.$store.getters['version']()
    }
  }
}
</script>
