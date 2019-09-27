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
        @click:close="removeOwner(index)"
        >
          {{owner.nick}}</v-chip>

      <v-autocomplete
        v-model="newOwner"
        :items="nonOwners"></v-autocomplete>
      <v-btn color="primary" @click="addOwner">Add to Owners</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  props: [
    'siteid'
  ],
  data: () => ({
    newOwner: null
  }),
  computed: {
    owners () {
      console.log(this.$store.getters['site/owners']())
      return this.$store.getters['site/owners']()
    },
    nonOwners () {
      const allUsers = this.$store.getters['users/listArray']()
      if (allUsers === []) return []
      const all = allUsers.filter(user => {
        if (user.owns === null || typeof user.owns === 'undefined') return true
        return !user.owns.includes(this.siteid)
      })
      var r = []
      // const all = this.$store.getters['users/nonOwners'](this.$store.state.binder.site.link)
      for (const i in all) {
        r.push(all[i].nick)
      }
      return r
    },
    currentUser () {
      return this.$store.getters['author/uid']()
    }
  },
  methods: {
    addOwner () {
      const allUsers = this.$store.getters['users/listArray']()
      const newUid = allUsers.filter((user) => {
        if (user.nick === this.newOwner) return true
      })[0].uid
      this.$store.dispatch('users/addOwner', { siteid: this.siteid, uid: newUid })
    },
    removeOwner (uid) {
      console.log('removeOwner', uid)
      this.$store.dispatch('users/removeOwner', { siteid: this.siteid, uid: uid })
    }
  }
}
</script>
