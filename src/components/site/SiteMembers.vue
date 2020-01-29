<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Members</v-toolbar-title>
    </v-toolbar>
    <v-card-text>

      <v-chip
        class="ma-1"
        v-for="(member, index) in members"
        v-bind:key="index"
        :outlined="index === userUID"
        :close="!(index === userUID) && isOwner"
        @click:close="removeMember(index)"
        >
          {{member.nick}}</v-chip>

      <v-autocomplete
        v-if="isOwner"
        v-model="newMember"
        :items="nonMembers"></v-autocomplete>

      <v-btn
        v-if="isOwner"
        color="primary"
        @click="addMember">Add to Members</v-btn>

    </v-card-text>
  </v-card>
</template>

<script>
import _ from 'lodash'

export default {
  computed: {
    userUID () {
      return this.$store.getters['author/uid']
    },
    isOwner () {
      const authID = this.$store.getters['author/uid']()
      const owners = this.$store.getters['site/owners']()
      console.log(authID, owners, authID in owners)
      return authID &&
        owners &&
        authID in owners
    },
    members () {
      const owners = this.$store.getters['site/owners']()
      const members = Object.assign({}, this.$store.getters['site/members']())

      // Remove all owners from members view
      _.forEach(owners, (value, key) => { delete members[key] })
      return members
    },
    nonMembers () {
      const allUsers = Object.assign({}, this.$store.getters['users/all']())

      // Remove all members from nonMembers
      _.forEach(this.$store.getters['site/members'](),
        (value, key) => {
          delete allUsers[key]
        })

      var r = []
      for (const i in allUsers) {
        r.push(allUsers[i].nick)
      }
      return r
    }
  },
  methods: {
    removeMember (uid) {
      this.$store.dispatch('site/removeMember', { uid: uid })
    }
  }
}
</script>
