<template>
  <v-card>
    <v-toolbar>
     <v-toolbar-title>Owners</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-chip
        v-for="(owner, index) in owners"
        v-bind:key="index"
        :outlined="index === currentUser"
        >
          {{owner.nick}}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
// v-chip
// :close="!(index === currentUser)"
// @click:close="removeOwner(owner.uid)"

export default {
  computed: {
    owners () {
      // return null
      return this.$store.getters['sites/owners']()
    },
    currentUser () {
      return this.$store.getters['author/uid']()
    }
  }
}
</script>
