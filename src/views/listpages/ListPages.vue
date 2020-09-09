<template>
  <v-container >
    <v-row v-if="meta.loading">
      <v-col>
        <Loading
          center
          class="ma-4"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TabTitle
          :sub="site.name"
          :sublink="`/v/${site.siteid}`"
          :topic="$t('pagelist.title')"/>
        </v-col>
      </v-row>
      <v-row v-if="!meta.loading">
        <v-col>
          <v-card>
            <v-card-text>
              <div class="index">
              <template v-for="(cat, index) in categories">
                <div v-bind:key="index" class="catIndex" v-if="pagesForCategory(cat.value).length > 0">
                  <h1>{{cat.text}}</h1>
                  <template v-for="(page, indexPages) in pagesForCategory(cat.value)">
                    <p v-bind:key="indexPages"><a :href="`/#/v/${page.siteid}/${page.pageid}`">{{page.name}}</a></p>
                  </template>
                </div>
              </template>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionAPI, { defineComponent, onMounted, ref, watch, onUnmounted } from '@vue/composition-api'
import firebase, { firestore } from 'firebase/app'
import 'firebase/firestore'
import Loading from '@/components/Loading.vue'
import TabTitle from '@/components/app/TabTitle.vue'
import { useSite } from '@/lib/useSite'
import { Page } from '@/plugins/skaldfire'
import { usePage } from '@/lib/usePage'
Vue.use(VueCompositionAPI)

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
    const { site, meta } = useSite()
    const { categories } = usePage()
    const listArray:Page[] = []
    const pageList = ref(listArray)
    let unsubscribe = () => {}

    onMounted(() => { subscribe(props.siteid) })
    onUnmounted(() => { unsubscribe() })
    watch(site, (newSite) => {
      console.log(newSite)
      subscribe(newSite.siteid)
    })

    function subscribe (siteid:string):void {
      console.log('opening up', siteid)
      if (!siteid) return
      unsubscribe()
      pageList.value.length = 0

      const db = firebase.firestore()
      const listRef = db.collection('sites').doc(siteid).collection('pages')

      unsubscribe = listRef.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((docChange) => {
          const data = docChange.doc.data()
          pageList.value.push({
            pageid: docChange.doc.id,
            siteid: siteid,
            name: data.name,
            category: data.category
          })
        })
      })
    }

    function pagesForCategory (cat:string):Page[] {
      if (!cat) {
        return pageList.value.filter((item) => { return !item.category })
      }
      return pageList.value.filter((item) => { return item.category === cat })
    }

    return { site, meta, categories, pageList, pagesForCategory }
  }
})
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  flex-wrap: wrap;
  .catIndex{
    min-width: 220px;
    flex-grow: 1;
    h1 {
      margin-bottom: 16px;
    }
    p {
      margin: 0;
      margin-bottom: 8px;
    }
  }
  .catIndex+.catIndex {
    border-left: solid 1px rgba(0,0,0,0.4);
    padding-left: 8px;
  }
}
</style>
