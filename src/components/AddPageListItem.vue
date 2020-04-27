<template>
  <v-list-item
    id="navi-add-page-action"
    :inactive="!isAuthz"
    @click="openDialog">
    <v-list-item-action><v-icon>mdi-file-plus</v-icon></v-list-item-action>
    <v-list-item-title>{{$t('navigation_action_add_page')}}</v-list-item-title>
    <v-dialog
      v-if="isAuthz"
      v-model="dialog"
      max-width="800"
      ><CreatePageCard v-on:closeDialog="close"/>
    </v-dialog>
  </v-list-item>
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
    },
    openDialog () {
      if (this.isAuthz) this.dialog = true
    }
  },
  computed: {
    isAuthz () {
      return this.$store.getters.isAuthz()
    }
  }
}
</script>
