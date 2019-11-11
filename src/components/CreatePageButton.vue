<template>
  <div>
    <v-btn
      icon
      v-if="isAuthz"
      @click="dialog=!dialog"><v-icon>mdi-plus</v-icon></v-btn>
    <v-dialog
      v-model="dialog"
      max-width="800"
      >
      <CreatePageCard v-on:closeDialog="close"/>
    </v-dialog>
  </div>
</template>

<script>
import CreatePageCard from './CreatePageCard'

export default {
  components: {
    CreatePageCard
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    close () {
      this.dialog = false
    }
  },
  computed: {
    isAuthz () {
      return this.$store.getters.isAuthz
    }
  }
}
</script>
