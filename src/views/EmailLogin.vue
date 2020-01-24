<template>
  <div style="margin:16px;max-width:800px">
    <v-form  @submit.prevent="login">
      <v-text-field id="un" v-model="username"></v-text-field>
      <v-text-field id="pw"  v-model="password"></v-text-field>
      <v-btn id="login-button" color="primary" @click="login">login</v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data: () => ({
    username: null,
    password: null
  }),
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(() => {
        this.$router.push('/')
      }).catch((error) => {
        this.$store.commit('error', error)
      })
    }
  }
}
</script>
