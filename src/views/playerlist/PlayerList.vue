<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <PlayerList/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { /* reactive, toRefs, */ ref, defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import PlayerList from '@/components/playerlist/PlayerList.vue'
Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    PlayerList
  }
})
</script>
