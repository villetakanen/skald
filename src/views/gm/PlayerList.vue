<template>
  <v-container>
    <v-row>
      <v-col>
        <TabTitle
          :sub="$t('view_gm_players.title')"
          :topic="siteid"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Loading v-if='loading'/>
        <v-card v-if="!loading">
          <v-card-title>{{$t('view_gm_players.title')}}</v-card-title>
          <v-card-text>
            <AddPlayersAction :siteid="siteid"/>
            <template v-for="(player, index) in players">
              <div v-bind:key="index">
                <div class="playerlist-cell">
                  {{player.nick}}
                </div>
                <div class="playerlist-cell">
                  <template v-for="(tag, tagIndex) in player.tags">
                    <span v-bind:key="tagIndex" class="playerlist-tag">{{tag}}</span>
                  </template>
                </div>
              </div>
            </template>
          </v-card-text>
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
import AddPlayersAction from '../../components/site/AddPlayersAction.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    Loading,
    TabTitle,
    AddPlayersAction
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
      const db = firebase.firestore()
      const playerRef = db.collection('sites').doc(props.siteid).collection('players')
      unsubscribePlayers = playerRef.onSnapshot((data) => {
        const playerData:object[] = []
        data.forEach((player) => {
          playerData.push(player.data())
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
