<template>
  <v-list>
    <template v-if="siteid">
      <v-list-item :to="`/v/${siteid}`">
        <v-list-item-action><v-icon>mdi-dice-3</v-icon></v-list-item-action>
        <v-list-item-title >{{siteName}}</v-list-item-title>
      </v-list-item>
      <v-list-item
        id="navi-site-in-game-secrets-link"
        :to="`/g/${siteid}/gm/players`">
        <v-list-item-action><v-icon>mdi-account-multiple</v-icon></v-list-item-action>
        <v-list-item-title >{{$t('view_gm_players.link_to')}}</v-list-item-title>
      </v-list-item>
      <v-list-item id="nav-page-list-link" :to="'/l/pages/'+siteid">
        <v-list-item-action><v-icon>mdi-file-tree</v-icon></v-list-item-action>
        <v-list-item-title >{{$t('navigation_to_pages')}}</v-list-item-title>
      </v-list-item>
      <!-- @click: CreatePageCard, the dialog for adding a page -->
      <!-- AddPageListItem v-if="editorActions" -->
      <CreatePageAction v-if="editorActions"/>
      <v-list-item id="navi-attachment-list-link" :to="'/l/attachments/'+siteid">
        <v-list-item-action><v-icon>mdi-view-grid-plus</v-icon></v-list-item-action>
        <v-list-item-title >{{$t('navigation_to_attachments')}}</v-list-item-title>
      </v-list-item>

      <!-- Site settings -->
      <v-list-item
        id="navi-site-settings-link"
        v-if="editorActions"
        :to="'/c/site/'+siteid">
        <v-list-item-action><v-icon>mdi-cog-box</v-icon></v-list-item-action>
        <v-list-item-title >{{$t('navigation_to_site_settings')}}</v-list-item-title>
      </v-list-item>

      <v-subheader>Meta</v-subheader>
    </template>
    <v-list-item :to="'/'">
      <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
      <v-list-item-title >{{$t('navigation_to_skald_home')}}</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/l/sites'">
      <v-list-item-action><v-icon>mdi-view-dashboard</v-icon></v-list-item-action>
      <v-list-item-title>{{$t('navigation_to_site_index')}}</v-list-item-title>
    </v-list-item>
    <v-list-item href="https://github.com/vitku/skald">
      <v-list-item-action><v-icon>mdi-language-javascript</v-icon></v-list-item-action>
      <v-list-item-title>GitHub</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <LanguageSwitcher/>

  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, computed } from '@vue/composition-api'
import AddPageListItem from '@/components/AddPageListItem.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import CreatePageAction from '@/components/createpageaction/CreatePageAction.vue'
import { useSite } from '@/lib/useSite'
import { useProfile } from '@/lib/useProfile'
Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    AddPageListItem,
    LanguageSwitcher,
    CreatePageAction
  },
  setup () {
    const { site } = useSite()
    const siteid = computed(() => site.value.siteid)
    const siteName = computed(() => site.value.name)
    const { activeProfile } = useProfile()
    const editorActions = computed(() =>
      activeProfile.value &&
      activeProfile.value.owns &&
      activeProfile.value.owns.includes(site.value.siteid))
    return { siteid, siteName, editorActions }
  }
})
</script>
