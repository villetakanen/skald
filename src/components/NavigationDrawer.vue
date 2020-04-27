<template>
  <v-list>
    <template v-if="siteid !== null">

      <v-list-item :to="'/v/'+siteid">
        <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
        <v-list-item-title >{{siteName}}</v-list-item-title>
      </v-list-item>

      <v-list-item id="nav-page-list-link" :to="'/l/pages/'+siteid">
        <v-list-item-action><v-icon>mdi-file-tree</v-icon></v-list-item-action>
        <v-list-item-title >{{$t('navigation_to_pages')}}</v-list-item-title>
      </v-list-item>

      <!-- @click: CreatePageCard, the dialog for adding a page -->
      <AddPageListItem/>

      <v-list-item
        id="navi-attachment-list-link"
        :to="'/l/attachments/'+siteid">
        <v-list-item-action><v-icon>mdi-view-grid-plus</v-icon></v-list-item-action>
        <v-list-item-title >{{$t('navigation_to_attachments')}}</v-list-item-title>
      </v-list-item>

      <v-list-item
        id="navi-site-settings-link"
        :to="'/c/site/'+siteid">
        <v-list-item-action><v-icon>mdi-settings</v-icon></v-list-item-action>
        <v-list-item-title >{{$t('navigation_to_site_settings')}}</v-list-item-title>
      </v-list-item>
    </template>

    <v-subheader>Meta</v-subheader>
    <v-list-item :to="'/'">
      <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>

      <v-list-item-title >{{$t('navigation_to_skald_home')}}</v-list-item-title>
    </v-list-item>

    <v-list-item :to="'/l/sites'">
      <v-list-item-action><v-icon>mdi-view-dashboard</v-icon></v-list-item-action>

      <v-list-item-title>{{$t('navigation_to_site_index')}}</v-list-item-title>
    </v-list-item>

    <v-list-item :to="'/v/skald/beta-about'">
      <v-list-item-action><v-icon>mdi-information-outline</v-icon></v-list-item-action>

      <v-list-item-title >About</v-list-item-title>
    </v-list-item>
    <v-list-item href="https://github.com/vitku/skald">
      <v-list-item-action><v-icon>mdi-language-javascript</v-icon></v-list-item-action>
      <v-list-item-title>GitHub</v-list-item-title>
    </v-list-item>
    <v-list-item :to="'/v/skald/beta-backlog'">
      <v-list-item-action><v-icon>mdi-cup-water</v-icon></v-list-item-action>

      <v-list-item-title >{{version}}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <LanguageSwitcher/>

    <!--v-list-item :to="'/stylebook'">
      <v-list-item-action><v-icon>mdi-fridge</v-icon></v-list-item-action>

      <v-list-item-title >Stylebook</v-list-item-title>
    </v-list-item-->
  </v-list>
</template>

<script>
import AddPageListItem from './AddPageListItem'
import LanguageSwitcher from './LanguageSwitcher'

export default {
  components: {
    AddPageListItem,
    LanguageSwitcher
  },
  computed: {
    version () {
      return this.$store.getters.version()
    },
    siteid () {
      return this.$store.getters['site/id']()
    },
    siteName () {
      return this.$store.getters['site/name']()
    }
  }
}
</script>
