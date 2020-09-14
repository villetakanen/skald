<template>
  <v-dialog
    v-model="dialog"
    width="500"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        small
        color="secondary"
        class="mr-2"
        :disabled="!isOwner(siteid)"
        v-bind="attrs"
        v-on="on"
      >
        mdi-pencil
      </v-icon>
    </template>

    <v-card>
      <v-card-title><span v-if="player">{{player.nick}}</span></v-card-title>
      <v-card-text v-if="player">>
        <div>
          <template v-for="(tag, index) in player.tags">
            <v-chip
              class = "ma-1"
              v-bind:key="index"
              color="primary"
              @click="dropTag(tag)">{{tag}}</v-chip>
          </template>
        </div>
        <div>
          <template v-for="(tag2, index2) in availableTags">
            <v-chip
              v-bind:key="index2"
              color="dark"
              class = "ma-1"
              @click="addTag(tag2)">
              <v-avatar left>
                <v-icon>mdi-plus</v-icon>
              </v-avatar>
              {{tag2}}</v-chip>
          </template>
        </div>
        <v-text-field
          v-model="newTag"
          append-icon="mdi-plus"
          @click:append="addNewTag()"/>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="dialog=!dialog">{{$t('actions.close')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { computed, defineComponent, onMounted, ref } from '@vue/composition-api'
import { usePlayers } from '@/lib/usePlayers'
import { useProfile } from '@/lib/useProfile'
import firebase, { FirebaseError } from 'firebase/app'
import 'firebase/firestore'
import { useAppState } from '@/lib/useAppState'
Vue.use(VueCompositionApi)

export default defineComponent({
  props: {
    siteid: {
      type: [String],
      required: true
    },
    uid: {
      type: [String],
      required: true
    }
  },
  setup (props) {
    const { getPlayer, players } = usePlayers()
    const { isOwner } = useProfile()
    const player = computed(() => (getPlayer(props.uid)))
    const { raiseError } = useAppState()
    const dialog = ref(false)
    const newTag = ref('')
    const availableTags = computed(() => {
      const av:string[] = []
      players.value.tags.forEach((tag) => {
        if (!player.value || !player.value.tags) {
          av.push(tag)
        } else if (!player.value.tags.includes(tag)) {
          av.push(tag)
        }
      })
      return av
    })
    function addTag (tag:string):void {
      // noop if exists
      if (player.value && player.value.tags &&
        player.value.tags.includes(tag)) return
      const db = firebase.firestore()
      const playerRef = db.collection('sites').doc(props.siteid).collection('players').doc(props.uid)
      let newTags:string[]
      if (player.value && player.value.tags) newTags = player.value.tags
      else newTags = []
      newTags.push(tag)
      playerRef.update({ tags: newTags }).catch((error:Error) => {
        raiseError(error as FirebaseError)
      })
    }
    function dropTag (tag:string):void {
      if (player.value && player.value.tags &&
        player.value.tags.includes(tag)) {
        // Pop tag from local cache
        const newTags:string[] = player.value.tags.filter((element:string) => {
          return element !== tag
        })
        // Save local state to firebase
        const db = firebase.firestore()
        const playerRef = db.collection('sites').doc(props.siteid).collection('players').doc(props.uid)
        playerRef.update({ tags: newTags }).catch((error:Error) => {
          raiseError(error as FirebaseError)
        })
      }
    }
    function addNewTag () {
      if (newTag.value) addTag(newTag.value)
      newTag.value = ''
    }
    return { dialog, player, isOwner, availableTags, addTag, dropTag, newTag, addNewTag }
  }
})
</script>
