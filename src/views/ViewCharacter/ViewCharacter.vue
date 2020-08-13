<template>
  <v-container>
    <v-row>
      <v-column>
        <Character
          siteid=""
          playerid=""
          />
      </v-column>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent } from '@vue/composition-api'
import Character from '../../components/character/Character.vue'

Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    Character
  }
})
</script>
