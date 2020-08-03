<template>
  <div class="pri">
    <div>{{nick}}</div>
    <div>
      <template v-for="(tag, index) in tags">
        <v-chip
          class="mx-1"
          small
          close
          v-bind:key=index
          @click:close="dropTag(tag)">{{tag}}</v-chip>
      </template>
    </div>
    <div class="pri-add-tags">
      <div>
        <v-text-field v-model="newTag"></v-text-field>
      </div>
      <div>
        <v-btn
          icon
          small
          color="primary"
          @click="addTag(newTag)"><v-icon>mdi-plus</v-icon></v-btn>
      </div>
    </div>
    <div>
      <v-btn
        color="secondary"
        text
        @click="dropPlayer()"
        >{{$t('view_gm_players.drop_player')}}</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref } from '@vue/composition-api'
import firebase from 'firebase/app'
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
    },
    nick: {
      type: [String],
      required: true
    },
    tags: {
      type: [Array],
      required: true
    }
  },
  setup (props) {
    const newTag = ref('')

    const addTag = (tag:string) => {
      const db = firebase.firestore()
      const playerRef = db.collection('sites').doc(props.siteid)
        .collection('players').doc(props.uid)

      playerRef.get().then((doc) => {
        if (doc.exists) {
          let tags:string[] = doc?.data()?.tags
          if (!tags) tags = []
          if (!tags.includes(tag)) {
            tags.push(tag)
            playerRef.update({ tags: tags })
          }
        }
      })
    }

    const dropTag = (tag:string) => {
      const db = firebase.firestore()
      const playerRef = db.collection('sites').doc(props.siteid)
        .collection('players').doc(props.uid)

      playerRef.get().then((doc) => {
        if (doc.exists) {
          let tags:string[] = doc?.data()?.tags
          if (!tags) tags = []
          const filteredTags: string[] = tags.filter((item) => { return item !== tag })
          if (tags.includes(tag)) {
            tags.push(tag)
            playerRef.update({ tags: filteredTags })
          }
        }
      })
    }

    const dropPlayer = () => {
      const db = firebase.firestore()
      const playerRef = db.collection('sites').doc(props.siteid)
        .collection('players').doc(props.uid)
      playerRef.delete()
    }

    return { addTag, dropPlayer, dropTag, newTag }
  }
})
</script>

<style lang="scss" scoped>
.pri{
  display: grid;
  grid-template-columns: 30% 30% 20% 20%;
  div.pri-add-tags{
    display: flex;
    div{
      align-self: center;
    }
  }
}
</style>
