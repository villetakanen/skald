<template>
  <v-dialog v-model="dialog" width="600px">
    <v-card>
      <v-card-title>An Error occured.</v-card-title>
      <v-card-text>{{error}}</v-card-text>
      <v-card-actions>
        <v-btn @click="clearErrors">Carry on</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog () {
      return this.$store.getters.error() !== null
    },
    error () {
      const errorObject = this.$store.getters.error()
      if (errorObject && errorObject.code) return errorObject.code
      return errorObject
    }
  },
  methods: {
    clearErrors () {
      this.$store.commit('error', null)
    }
  }
}
</script>
