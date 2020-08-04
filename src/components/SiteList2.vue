<template>
  <v-container>
    <div>Props: {{count}} {{paging}} {{cols}}</div>
    <template v-for="(site, index) in allSites">
      <v-card
        class = "my-1"
        v-bind:key="index">
        <v-card-text>{{site.name}}</v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, onMounted, ref, onUnmounted } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueCompositionApi)

interface site{
   siteid: string,
   name: string
}

export default defineComponent({
  props: {
    count: {
      type: [Number],
      required: false
    },
    paging: {
      type: [Boolean],
      required: false
    },
    cols: {
      type: [Number],
      required: false
    }
  },
  setup (props) {
    const allSitesArray: site[] = []
    const allSites = ref(allSitesArray)
    let unsubscibe = () => {}
    onMounted(() => {
      const db = firebase.firestore()
      const sitesRef = db.collection('sites').orderBy('lastUpdate', 'desc')// .where('hidden', '==', 'false')
      unsubscibe = sitesRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().nonlisted !== true) {
            allSites.value.push({
              siteid: doc.id,
              name: doc.data().name
            })
          }
          console.info('pushing', doc.data())
        })
      })
    })
    onUnmounted(() => { unsubscibe() })
    return { allSites }
  }
})
</script>
