<template>
  <v-snackbar
    v-model="visible"
    :color="color"
    multi-line
    top>

    <div>
      <h1>{{title}}</h1>
      <p>{{message}}</p>
    </div>

    <template v-slot:action="{ attrs }">
       <v-btn
          text
          v-bind="attrs"
          @click="clear"
        >
          {{$t('actions.close')}}
        </v-btn>
        <v-btn
          text
          v-bind="attrs"
          @click="clear"
        >
          {{$t('actions.close')}}
        </v-btn>
    </template></v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref, watch, computed } from '@vue/composition-api'
import { useAppState, alerts } from '@/lib/useAppState'
import { useProfile } from '@/lib/useProfile'
import { useSite } from '@/lib/useSite'
Vue.use(VueCompositionApi)

export default defineComponent({
  setup (props) {
    const { alerts, clearErrors, raiseError, state } = useAppState()
    const { isOwner } = useProfile()
    const { site } = useSite()
    const visible = alerts
    const title = computed(() => state.value.errorName)
    const message = computed(() => state.value.errorMessage)
    const createMissing = computed(() => isOwner(site.value.siteid) && state.value.errorCode === '404')
    const color = computed(() => {
      if (createMissing.value) {
        return 'dark'
      } else {
        return 'error'
      }
    })

    function clear () {
      clearErrors()
    }

    return { visible, title, clear, message, color, createMissing }
  }
})
</script>
