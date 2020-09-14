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
      <v-card-title>{{player.nick}}</v-card-title>
      <v-card-text>
        <template v-for="(tag, index) in player.tags">
          <v-chip
            v-bind:key="index"
            color="primary">{{tag}}</v-chip>
        </template>
        <hr/>
        <template v-for="(tag, index2) in availableTags">
          <v-chip
            v-bind:key="index2"
            color="dark"
            @click="addTag(tag)">
            <v-avatar left>
              <v-icon>mdi-plus</v-icon>
            </v-avatar>
            {{tag}}</v-chip>
        </template>
      </v-card-text>
      <v-card-actions>{{$t('view_gm_players.addPlayerToSite')}}</v-card-actions>
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
    const dialog = ref(false)
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
      playerRef.update({ tags: newTags })
    }
    return { dialog, player, isOwner, availableTags, addTag }
  }
})
</script>
