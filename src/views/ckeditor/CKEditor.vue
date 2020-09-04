<template>
  <v-container>
     <v-row>
        <v-col>
          <TabTitle
            :sub="site.name"
            :sublink="`/v/${site.siteid}`"
            :topic="page.name"
            :link="`/v/${site.siteid}/${page.pageid}`"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Loading
            center
            class="ma-4"
            v-if="meta.loading"/>
        </v-col>
      </v-row>
      <v-row v-if="!meta.loading">
      <v-col cols="12" md="8">
        <CKEditorCard/>
      </v-col>
      <v-col cols="12" md="4">
        <PageMetadataCard/>
        <v-card class="my-4">
          <v-card-title>Debug</v-card-title>
          <v-card-text>
            <p>siteid: [{{ siteid }}]</p>
            <p>pageid: [{{ pageid }}]</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, ComputedRef } from '@vue/composition-api'
import { useParams } from '@/lib/useParams'
import CKEditorCard from '@/components/ckeditorcard/CKEditorCard.vue'
import PageMetadataCard from '@/components/ckeditorcard/PageMetadataCard.vue'
import { usePage } from '@/lib/usePage'
import { useSite } from '@/lib/useSite'
import Loading from '@/components/Loading.vue'
import TabTitle from '@/components/app/TabTitle.vue'

interface PageRoute {
  siteid:string,
  pageid?:string
}

export default defineComponent({
  components: {
    CKEditorCard,
    PageMetadataCard,
    Loading,
    TabTitle
  },
  setup (props) {
    const siteid = ref('')
    const pageid = ref('')
    const { page, meta } = usePage()
    const { site } = useSite()

    /**
     * reactive update of all components of the view,
     * based on siteid and pageid? values of route.
     * If no pageid is give, we use the siteid as pageid.
     *
     * @param p The Vue router `route.params` value from `useParams()`
     */
    function setPage (p:Object) {
      const pageRoute = p as PageRoute
      siteid.value = pageRoute.siteid
      if (pageRoute.pageid) pageid.value = pageRoute.pageid
      else pageid.value = siteid.value
    }

    // useParams, to get the site and page id's
    const params = useParams()
    // reload/remount etc
    onMounted(() => { setPage(params.value) })
    // route changed
    watch(params, setPage)

    return { siteid, pageid, site, page, meta }
  }
})
</script>
