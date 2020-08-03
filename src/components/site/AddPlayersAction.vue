<template>
  <div class="AddPlayersAction">
    <v-select
      v-model="selectedUser"
      :items="allUserNicks">
    </v-select>
    <v-btn
      @click="addPlayer(selectedUser)"
      >Add a Player</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, onMounted, ref } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

Vue.use(VueCompositionApi)

interface profile {
  uid: string
  nick: string
}

export default defineComponent({
  props: {
    siteid: {
      type: [String],
      required: true
    }
  },
  setup (props) {
    const currentUser = firebase.auth().currentUser
    const selectedUser = ref('')
    const userArray: profile[] = []
    const userNickArray: string[] = []
    onMounted(() => {
      const db = firebase.firestore()
      const playerRef = db.collection('profiles')
      playerRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id !== currentUser?.uid) {
            userArray.push({ uid: doc.id, nick: doc.data().nick })
            userNickArray.push(doc.data().nick)
          }
        })
      })
    })
    const allUserNicks = ref(userNickArray)
    const allUsers = ref(userArray)

    const addPlayer = (userNick: string) => {
      const db = firebase.firestore()
      const playersRef = db.collection('sites').doc(props.siteid).collection('players')
      const player = allUsers.value.find((user) => { return user.nick === userNick })
      playersRef.doc(player?.uid).set({ nick: userNick, tags: [] })
    }

    return { allUserNicks, allUsers, addPlayer, selectedUser }
  }
})
</script>
