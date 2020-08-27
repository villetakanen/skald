<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <CKEditorCard/>
      </v-col>
      <v-col cols="4">
        <v-card>
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

interface PageRoute {
  siteid:string,
  pageid?:string
}

export default defineComponent({
  components: {
    CKEditorCard
  },
  setup (props) {
    const siteid = ref('')
    const pageid = ref('')

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

    return { siteid, pageid }
  }
})
</script>
