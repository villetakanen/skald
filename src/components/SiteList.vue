<template>
  <div class="sitelist">
    <template v-for="(site, index) in allSites">
      <SiteCard
        v-if="!count || index < count + 1"
        class = "my-2"
        v-bind:key="index"
        :siteid="site.siteid"
        :title="site.name"
        :description="site.description"
        :posterURL="site.posterURL"
        :theme="site.theme">
      </SiteCard>
    </template>
    <!-- div>Props: {{count}} {{paging}} {{cols}}</div -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, onMounted, ref, onUnmounted } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Site } from '../plugins/skaldfire'
import SiteCard from './site/SiteCard.vue'

Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    SiteCard
  },
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
    const allSitesArray: Site[] = []
    const allSites = ref(allSitesArray)
    let unsubscibe = () => {}
    onMounted(() => {
      const db = firebase.firestore()
      const sitesRef = db.collection('sites').orderBy('lastUpdate', 'desc')// .where('hidden', '==', 'false')
      unsubscibe = sitesRef.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().nonlisted !== true &&
            doc.data().hidden !== true) {
            const site: Site = {
              siteid: doc.id,
              name: doc.data().name,
              posterURL: doc.data().posterURL,
              description: doc.data().description,
              theme: doc.data().theme
            }
            allSites.value.push(site)
          }
        })
      })
    })
    onUnmounted(() => { unsubscibe() })

    return { allSites }
  }
})
</script>

<style lang="scss" scoped>
.v-application .sitelist {
  a.my-2:first-of-type {
    margin-top: 0 !important;
  }
}
</style>
