<template>
  <div class="page-container">
    <Loading
      center
      class="ma-4"
      v-if="loading"/>
    <v-container v-if="!loading">
      <v-row>
        <v-col>
          <TabTitle
            :sub="site.name"
            :sublink="`/v/${site.siteid}`"
            :topic="page.name"
            :link="`/v/${site.siteid}/${page.pageid}`"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { usePage } from '@/lib/usePage'
import Loading from '@/components/Loading.vue'
import { useSite } from '@/lib/useSite'
export default defineComponent({
  components: {
    Loading
  },
  setup () {
    const { loading: siteLoading, site } = useSite()
    const { loading: pageLoading, page } = usePage()
    const loading = computed(() => siteLoading && pageLoading)
    return { loading, page }
  }
})
</script>
