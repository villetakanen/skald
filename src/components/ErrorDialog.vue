<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card>
      <v-card-title>An Error occured.</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog () {
      return this.$store.getters.error() !== null
    }
  }
}
</script>
