<template>
  <v-dialog
    v-model="dialog"
    width="500"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        v-bind="attrs"
        v-on="on"
        >{{$t('view_gm_players.addPlayerToSite')}}</v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{$t('view_gm_players.addPlayerToSite')}}
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="selectedUser"
          :items="allUserNicks"></v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="addPlayer(selectedUser)"
          :disabled="!selectedUser"
          color="primary"
          >{{$t('view_gm_players.addPlayerToSiteButton')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, onMounted, ref } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'

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
    const dialog = ref(false)
    const selectedUser = ref('')
    const userArray: profile[] = []
    const userNickArray: string[] = []
    onMounted(() => {
      const db = firebase.firestore()
      const playerRef = db.collection('profiles')
      playerRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          userArray.push({ uid: doc.id, nick: doc.data().nick })
          userNickArray.push(doc.data().nick)
        })
      })
    })
    const allUserNicks = ref(userNickArray)
    const allUsers = ref(userArray)

    const addPlayer = (userNick: string) => {
      const db = firebase.firestore()
      const playersRef = db.collection('sites').doc(props.siteid).collection('players')
      const player = allUsers.value.find((user) => { return user.nick === userNick })
      playersRef.doc(player?.uid).set({ nick: userNick, tags: [] }).then(() => {
        dialog.value = false
      })
    }

    return { allUserNicks, allUsers, addPlayer, dialog, selectedUser }
  }
})
</script>

<style lang="scss" scoped>
.AddPlayersAction{
  display: grid;
  grid-template-columns: auto auto;
  .AddPlayersAction-column1{
    padding-right: 4px;
    justify-self: stretch;
  }
  .AddPlayersAction-column2{
    padding-left: 4px;
    justify-self: start;
    align-self: center;
  }
}
</style>
