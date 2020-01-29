<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Owners</v-toolbar-title>
    </v-toolbar>
    <v-card-text>

      <v-chip
        class="ma-1"
        v-for="(owner, index) in owners"
        v-bind:key="index"
        :outlined="index === currentUser"
        :close="!(index === currentUser) && isOwner"
        @click:close="removeOwner(index)"
        >
          {{owner.nick}}</v-chip>

      <v-autocomplete
        v-if="isOwner"
        v-model="newOwner"
        :items="nonOwners"></v-autocomplete>
      <v-btn
        v-if="isOwner"
        color="primary"
        @click="addOwner">Add to Owners</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import _ from 'lodash'

export default {
  props: [
    'siteid'
  ],
  data: () => ({
    newOwner: null
  }),
  computed: {
    owners () {
      return this.$store.getters['site/owners']()
    },
    nonOwners () {
      const owners = this.$store.getters['site/owners']()
      const allUsers = Object.assign({}, this.$store.getters['users/all']())

      // Remove all members from nonMembers
      _.forEach(owners, (value, key) => { delete allUsers[key] })

      var r = []
      for (const i in allUsers) {
        r.push(allUsers[i].nick)
      }
      return r
    },
    currentUser () {
      return this.$store.getters['author/uid']()
    },
    isOwner () {
      const authID = this.$store.getters['author/uid']()
      const owners = this.$store.getters['site/owners']()
      return authID &&
        owners &&
        authID in owners
    }
  },
  methods: {
    addOwner () {
      const allUsers = this.$store.getters['users/all']()
      const userUID = _.findKey(allUsers, { nick: this.newOwner })
      this.$store.dispatch('site/addOwner', { uid: userUID, nick: this.newOwner })
    },
    removeOwner (uid) {
      this.$store.dispatch('site/removeOwner', { uid: uid })
    }
  }
}
</script>
