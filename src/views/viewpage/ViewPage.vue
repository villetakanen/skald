<template>
  <div class="page-container">
    <v-container >
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
          <v-card>
            <v-card-text>
                <div class="wikipage">
                    <div :class="site.theme">
                      <div v-html="content"></div>
                    </div>
                </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4"><SideBar/></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { usePage } from '@/lib/usePage'
import Loading from '@/components/Loading.vue'
import TabTitle from '@/components/app/TabTitle.vue'
import SideBar from '@/components/site/SideBar.vue'
import { useSite } from '@/lib/useSite'
import Skaldmd from '@/lib/skaldmd'
export default defineComponent({
  components: {
    Loading,
    TabTitle,
    SideBar
  },
  setup () {
    const { site } = useSite()
    const { meta, page } = usePage()
    const content = computed(() => {
      if (!page) return ''
      if (page.value.htmlContentDraft) return page.value.htmlContentDraft
      else if (page.value.htmlContent) return page.value.htmlContent
      const skaldmd = new Skaldmd(site.value.siteid)
      return skaldmd.toHtml(page.value.content)
    })
    return { meta, page, site, content }
  }
})
</script>
