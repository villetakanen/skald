<template>
  <v-container class="align-right">
    <v-btn
      small
      text
      @click="forgetMeDialog=true"
      >Forget Me</v-btn>
    <v-dialog
      v-model="forgetMeDialog"
      max-width="800">
      <v-card>
        <v-card-title>Forget Me?</v-card-title>
        <v-card-text>
          <WikiText :content="forgetMeInfo" siteid="skald"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          I am OK, with above
          <v-checkbox
            class="mx-1"
            v-model="confirm"
            ></v-checkbox>
          <v-btn
            class="mx-1"
            @click="forgetMe"
            outlined
            :disabled="!confirm"
            color="primary">Yes, please destroy my profile permanently</v-btn>
          <v-btn
            class="mx-1"
            @click="forgetMeDialog=false"
            color="primary">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import WikiText from '../WikiText'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  components: {
    WikiText
  },
  data: () => ({
    forgetMeDialog: false,
    confirm: false
  }),
  computed: {
    forgetMeInfo () {
      if (this.$store.getters['metaBinder/page']('forget-me-info-box') === null) return ''
      return this.$store.getters['metaBinder/page']('forget-me-info-box').content
    }
  },
  methods: {
    forgetMe () {
      this.forgetMeDialog = false

      const uid = this.$store.getters['author/uid']()
      const db = firebase.firestore()
      const profile = db.collection('profiles').doc(uid)

      db.runTransaction((transaction) => {
        return transaction.get(profile).then((author) => {
          db.collection('sites').get().then((allSites) => {
            allSites.forEach((siteRef) => {
              db.collection('sites').doc(siteRef.id).collection('owners').doc(uid).get().then(
                (ownerRef) => {
                  if (ownerRef.exists) {
                    db.collection('sites').doc(siteRef.id).collection('owners').doc(uid).delete()
                  }
                })
              db.collection('sites').doc(siteRef.id).collection('members').doc(uid).get().then(
                (memberRef) => {
                  if (memberRef.exists) {
                    db.collection('sites').doc(siteRef.id).collection('members').doc(uid).delete()
                  }
                })
            })
          })
          return profile.delete()
        })
      }).then(() => {
        firebase.auth().signOut().then(() => {
        }, (error) => {
          this.$store.commit('error', error)
        })
      }).catch((error) => {
        this.$store.commit('error', error)
      })
    }
  }
}
</script>

<style scoped>
.align-right{
  text-align: right
}
</style>
