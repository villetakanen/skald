<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    :persistent="force">
    <v-card>
      <v-card-title>Welcome to Skald!</v-card-title>
      <v-card-text>
        <WikiText
          siteid='skald'
          :content="welcomePage"/>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="primary"
          @click="logout"
          >Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="createProfile"
          >Continue as {{displayName}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import WikiText from './WikiText'

export default {
  components: {
    WikiText
  },
  data: () => ({
    force: true
  }),
  computed: {
    dialog: {
      get () {
        return this.$store.getters.profileMissing() && this.force
      },
      set (val) {
        this.force = val
      }
    },
    welcomePage () {
      if (this.$store.getters['metaBinder/page']('profile-creation-info-box') === null) return ''
      return this.$store.getters['metaBinder/page']('profile-creation-info-box').content
    },
    displayName () {
      if (this.$store.getters['author/ssoUser']() === null) return '...'
      return this.$store.getters['author/ssoUser']().displayName
    }
  },
  methods: {
    createProfile () {
      this.$store.dispatch('author/nick', this.displayName)
      this.dialog = false
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('author/logout')
        this.$store.commit('profileMissing', false)
        this.dialog = false
      }).catch(function (error) {
        this.$store.dispatch('error', error)
      })
    }
  }
}
</script>
