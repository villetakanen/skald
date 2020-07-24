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
              <v-btn
                fab
                top
                right
                absolute
                color="secondary"
                @click="print"
              >
                <v-icon>mdi-printer</v-icon>
              </v-btn>
              <!--v-btn
                fab
                top
                right
                absolute
                color="secondary"
                style="margin-right: 64px"
              >
                <v-icon>mdi-download</v-icon>
              </v-btn-->
              <v-card-text>
                <WikiText :content="contents" :siteid="siteid"/>
              </v-card-text>
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
import WikiText from '../components/WikiText.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueCompositionApi)

interface PropData {
  [siteid: string]: 'skald'
}

export default defineComponent({
  components: {
    Loading,
    TabTitle,
    WikiText
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
      contents: '',
      loading: true
    })
    onMounted(() => {
      const db = firebase.firestore()
      const siteRef = db.collection('sites').doc(props.siteid)
      siteRef.get().then((siteData) => {
        if (siteData.exists) {
          site.description = siteData.data()?.description
          siteRef.collection('pages').get().then((pages) => {
            pages.forEach((page) => {
              site.contents += '# ' + page.data()?.name + '\n----\n'
              site.contents += page.data()?.content
            })
          })
        }
        site.loading = false
      })
    })
    const print = () => {
      window.print()
    }
    return { ...toRefs(site), print }
  }
})
</script>
