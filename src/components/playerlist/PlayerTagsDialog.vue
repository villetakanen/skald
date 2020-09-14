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
      <v-card-title>{{$t('view_gm_players.addPlayerToSite')}}</v-card-title>
      <v-card-text>{{$t('view_gm_players.addPlayerToSite')}}</v-card-text>
      <v-card-actions>{{$t('view_gm_players.addPlayerToSite')}}</v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { computed, defineComponent, onMounted, ref } from '@vue/composition-api'
import { usePlayers } from '@/lib/usePlayers'
import { useProfile } from '@/lib/useProfile'
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
    const { getPlayer } = usePlayers()
    const { isOwner } = useProfile()
    const player = computed(() => (getPlayer(props.uid)))
    const dialog = ref(false)
    return { dialog, player, isOwner }
  }
})
</script>
