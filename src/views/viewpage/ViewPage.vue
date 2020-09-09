<template>
  <div class="page-container">
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
            :topic="page.name"
            :link="`/v/${site.siteid}/${page.pageid}`"/>
        </v-col>
      </v-row>
      <v-row v-if="!meta.loading">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-text>
                <div class="wikipage">
                    <div :class="site.theme">
                      <WikiContent :html="content"/>
                    </div>
                </div>
                <v-btn
                  :disabled="!editorActions"
                  fab
                  small
                  top right absolute
                  style= "margin-right: 48px; margin-top:4px"
                  color="primary"
                  v-bind:to="`/edit/${site.siteid}/${page.pageid}`"
                  ><v-icon>mdi-pen</v-icon></v-btn>
                <v-speed-dial
                  v-model="dial"
                  top
                  right
                  direction="bottom"
                  absolute
                  style="margin-top:-32px">
                  <template v-slot:activator>
                    <v-btn
                      v-model="dial"
                      color="primary"
                      small
                      top
                      right
                      fab
                      elevation="2">
                      <v-icon v-if="dial">mdi-close</v-icon>
                      <v-icon v-else>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-btn
                    fab
                    dark
                    small
                    color="secondary"
                    @click="copyUrl"
                    >
                    <v-icon>mdi-link</v-icon>
                  </v-btn>
                  <v-btn
                    fab
                    color="secondary"
                    small
                    @click="showHistory">
                    <v-icon>mdi-file-eye</v-icon>
                  </v-btn>
                </v-speed-dial>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4"><SideBar/></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import { usePage } from '@/lib/usePage'
import Loading from '@/components/Loading.vue'
import TabTitle from '@/components/app/TabTitle.vue'
import SideBar from '@/components/site/SideBar.vue'
import WikiContent from '@/components/page/WikiContent.vue'
import { useSite } from '@/lib/useSite'
import Skaldmd from '@/lib/skaldmd'
import { useProfile } from '@/lib/useProfile'
import { useAppState } from '@/lib/useAppState'
import router from '@/router'
export default defineComponent({
  components: {
    Loading,
    TabTitle,
    SideBar,
    WikiContent
  },
  setup () {
    const { site } = useSite()
    const { meta, page } = usePage()
    const { pushSnack } = useAppState()
    const dial = ref(false)
    const content = computed(() => {
      if (!page) return ''
      else if (page.value.htmlContent) return page.value.htmlContent
      const skaldmd = new Skaldmd(site.value.siteid)
      return skaldmd.toHtml(page.value.content)
    })
    const { activeProfile } = useProfile()
    const editorActions = computed(() =>
      activeProfile.value &&
      activeProfile.value.owns &&
      activeProfile.value.owns.includes(site.value.siteid))

    const copyUrl = () => {
      const dummy = document.createElement('input')
      document.body.appendChild(dummy)
      dummy.value = window.location.href
      dummy.select()
      document.execCommand('copy')
      document.body.removeChild(dummy)
      pushSnack('Success', 'Url copied to clipboard')
    }
    const showHistory = () => {
      router.push('/i/' + site.value.siteid + '/' + page.value.pageid)
    }
    return { meta, page, site, content, editorActions, dial, copyUrl, showHistory }
  }
})
</script>
