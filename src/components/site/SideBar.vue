<template>
  <v-card class="sidebar">
    <v-card-text>
      <div v-html="content"></div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from '@vue/composition-api'
import Loading from '@/components/Loading.vue'
import { useSite } from '@/lib/useSite'
import Skaldmd from '@/lib/skaldmd'
import { Page } from '@/plugins/skaldfire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { update } from 'lodash'

export default defineComponent({
  components: {
    Loading
  },
  setup () {
    const { site } = useSite()
    const pagePrototype:Page = {
      pageid: '',
      siteid: '',
      name: '',
      content: '',
      htmlContent: '',
      htmlContentDraft: ''
    }
    const page = ref(pagePrototype)
    const loading = ref(false)
    let unsubscribe = () => {}
    let activeSiteid = ''
    const content = computed(() => {
      if (!page) return ''
      if (page.value.htmlContentDraft) return page.value.htmlContentDraft
      else if (page.value.htmlContent) return page.value.htmlContent
      const skaldmd = new Skaldmd(site.value.siteid)
      return skaldmd.toHtml(page.value.content)
    })
    function updateSidebar () {
      if (site.value.siteid === activeSiteid) return
      activeSiteid = site.value.siteid

      // Site changed, lets update sidebar
      const db = firebase.firestore()
      const pageRef = db.collection('sites').doc(activeSiteid).collection('pages').doc('sidebar')
      unsubscribe = pageRef.onSnapshot((pageSnapShot) => {
        page.value = {
          pageid: '',
          siteid: '',
          name: '',
          content: '',
          htmlContent: '',
          htmlContentDraft: ''
        }
        page.value.siteid = activeSiteid
        page.value.pageid = 'sidebar'
        page.value.name = pageSnapShot.data()?.name
        page.value.content = pageSnapShot.data()?.content
        page.value.htmlContent = pageSnapShot.data()?.htmlContent
        page.value.htmlContentDraft = pageSnapShot.data()?.htmlContentDraft
      })
    }
    onMounted(() => { updateSidebar() })
    watch(site, updateSidebar)
    return { loading, page, site, content }
  }
})
</script>
