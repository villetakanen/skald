<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="primary"
          v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list v-if="!isAuthz">
        <v-subheader>Login with</v-subheader>
        <v-list-item>
          <v-list-item-title>
             <v-btn
              rounded
              large
              @click="socialGoogleLogin">
              <img alt="google logo" style="width:28px" src="../assets/google-logo.svg"/>
              <span style="padding-left:11px">Google</span>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-if="isAuthz">
        <v-subheader>Welcome {{nick}}</v-subheader>
        <v-list-item>
          <v-list-item-title>My account</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn
              rounded
              large
              @click="logout"
              id="logout-button">
              Logout
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  computed: {
    isAuthz () {
      return this.$store.getters['isAuthz']()
    },
    nick () {
      return this.$store.getters['author/nick']()
    }
  },
  methods: {
    socialGoogleLogin () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.$store.dispatch('author/login', result.user)
      }).catch(function (error) {
        console.log('login failed', error.message)
      })
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.dispatch('author/logout')
      }).catch(function (error) {
        console.log('logout failed ' + error)
      })
    }
  }
}
</script>
