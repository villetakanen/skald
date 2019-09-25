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
        :close="!(index === currentUser)"
        @click:close="removeOwner(owner.uid)"
        >
          {{owner.nick}}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  computed: {
    owners () {
      return this.$store.getters['site/owners']()
    },
    currentUser () {
      return this.$store.getters['author/uid']()
    }
  }
}
</script>
