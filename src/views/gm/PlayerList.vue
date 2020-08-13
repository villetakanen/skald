<template>
  <v-container>
    <v-row>
      <v-col>
        <TabTitle
          :topic="$t('view_gm_players.title')"
          :sub="siteid"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Loading v-if='loading'/>
        <v-card v-if="!loading">
          <v-card-text>
            <template v-for="(player, index) in players">
              <div v-bind:key="index">
                <PlayerRowItem
                  v-bind:key="index"
                  :siteid="siteid"
                  :uid="player.uid"
                  :nick="player.nick"
                  :tags="player.tags"/>
              </div>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <AddPlayerAction :siteid="siteid"/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { /* reactive, toRefs, */ ref, defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import Loading from '../../components/Loading.vue'
import TabTitle from '../../components/TabTitle.vue'
import AddPlayerAction from '../../components/addplayeraction/AddPlayerAction.vue'
import PlayerRowItem from '../../components/site/PlayerRowItem.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    Loading,
    TabTitle,
    AddPlayerAction,
    PlayerRowItem
  },
  props: {
    siteid: {
      type: [String],
      required: true
    }
  },
  setup (props) {
    const loading = ref(true)
    const pr:object[] = []
    const players = ref(pr)
    let unsubscribePlayers = () => {}
    onMounted(() => {
      if (!props.siteid) return
      const db = firebase.firestore()
      const playerRef = db.collection('sites').doc(props.siteid).collection('players')
      unsubscribePlayers = playerRef.onSnapshot((data) => {
        const playerData:object[] = []
        data.forEach((player) => {
          const data = player.data()
          playerData.push({ uid: player.id, ...data })
        })
        players.value = playerData
        loading.value = false
      })
    })
    onUnmounted(() => { unsubscribePlayers() })
    return { loading, players }
  }
})
</script>

<style lang="scss" scoped>
.playerlist-cell {
  display: inline-block;
  padding-left: 8px;
}
.playerlist-tag {
  background-color: RGBA(170, 170, 170, 0.5);
  border-radius: 4px;
  padding: 0px 4px;
  display: inline-block;
  margin-left: 4px;
}

</style>
