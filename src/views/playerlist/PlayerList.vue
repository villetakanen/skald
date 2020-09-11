<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <PlayerList/>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <AddPlayerAction
              :siteid="site.siteid"/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { /* reactive, toRefs, */ ref, defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import PlayerList from '@/components/playerlist/PlayerList.vue'
import AddPlayerAction from '@/components/addplayeraction/AddPlayerAction.vue'
import { useSite } from '@/lib/useSite'
Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    PlayerList,
    AddPlayerAction
  },
  setup (props) {
    const { site } = useSite()
    return { site }
  }
})
</script>
