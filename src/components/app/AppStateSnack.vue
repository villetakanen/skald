<template>
  <v-snackbar
    v-model="visible"
    color="error"
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
    </template></v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, computed } from '@vue/composition-api'
import { useAppState, alerts } from '@/lib/useAppState'
import { useSite } from '@/lib/useSite'
import router from '@/router'

Vue.use(VueCompositionApi)

export default defineComponent({
  setup (props) {
    const { alerts, clearErrors, state } = useAppState()
    const { site } = useSite()
    const visible = alerts
    const title = computed(() => state.value.errorName)
    const message = computed(() => state.value.errorMessage)

    function clear () {
      if (state.value.errorCode === '404') router.push('/v/' + site.value.siteid)
      clearErrors()
    }

    return { visible, title, clear, message }
  }
})
</script>
