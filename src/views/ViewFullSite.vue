<template>
  <div class="page-container">
      <v-container v-if="loading">
        <v-row>
          <v-col align='center'>
            <Loading/>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="!loading">
        <v-row>
          <v-col>
            <TabTitle
              :sub="description"
              :topic="siteid"/>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-container>
                ... {{siteid}} <br/>
                ... {{description}}
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { reactive, toRefs, onMounted, defineComponent } from '@vue/composition-api'
import Loading from '../components/Loading.vue'
import TabTitle from '../components/TabTitle.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueCompositionApi)

interface PropData {
  [siteid: string]: 'skald'
}

export default defineComponent({
  components: {
    Loading,
    TabTitle
  },
  props: {
    siteid: {
      type: [String],
      required: true
    }
  },
  setup (props) {
    const site = reactive({
      description: null,
      loading: true
    })
    onMounted(() => {
      const db = firebase.firestore()
      const siteRef = db.collection('sites').doc(props.siteid)
      siteRef.get().then((siteData) => {
        if (siteData.exists) {
          site.description = siteData.data()?.description
        }
        site.loading = false
      })
    })
    return { ...toRefs(site) }
  }
})
</script>
