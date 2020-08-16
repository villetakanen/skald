<template>
  <v-snackbar
    v-model="visible"
    color="error"
    multi-line
    top>

    <div>
      <h1>Hi!</h1>
      <p>It's a Snack!</p>
    </div>

    <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="visible = false"
        >
          {{$t('actions.close')}}
        </v-btn>
    </template></v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref } from '@vue/composition-api'
import { appState, raiseError, clearErrors } from '@/lib/useAppState'
Vue.use(VueCompositionApi)

export default defineComponent({
  setup (props) {
    const visible = ref(true)

    // listen to appstate
    // clear error on close
    // etc
    
    return { visible }
  }
})
</script>
