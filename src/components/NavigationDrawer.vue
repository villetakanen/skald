<template>
  <v-list>
    <template v-if="siteID !== null">

      <v-list-item :to="'/v/'+siteID">
        <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>
        <v-list-item-title >{{siteName}}</v-list-item-title>
      </v-list-item>

      <v-list-item :to="'/l/pages/'+siteID">
        <v-list-item-action><v-icon>mdi-view-agenda</v-icon></v-list-item-action>

        <v-list-item-title >Pages</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action><CreatePageButton/></v-list-item-action>
        <v-list-item-title>Add Page</v-list-item-title>
      </v-list-item>
      <v-list-item :to="'/l/attachments/'+siteID">
        <v-list-item-action><v-icon>mdi-view-grid-plus</v-icon></v-list-item-action>

        <v-list-item-title >Attachments</v-list-item-title>
      </v-list-item>
      <v-list-item :to="'/c/site/'+siteID">
        <v-list-item-action><v-icon>mdi-settings</v-icon></v-list-item-action>

        <v-list-item-title >Settings</v-list-item-title>
      </v-list-item>
    </template>

    <v-subheader>Meta</v-subheader>
    <v-list-item :to="'/'">
      <v-list-item-action><v-icon>mdi-home</v-icon></v-list-item-action>

      <v-list-item-title >Home</v-list-item-title>
    </v-list-item>

    <v-list-item :to="'/l/sites'">
      <v-list-item-action><v-icon>mdi-view-dashboard</v-icon></v-list-item-action>

      <v-list-item-title>All sites</v-list-item-title>
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
    <!--v-list-item :to="'/stylebook'">
      <v-list-item-action><v-icon>mdi-fridge</v-icon></v-list-item-action>

      <v-list-item-title >Stylebook</v-list-item-title>
    </v-list-item-->
  </v-list>
</template>

<script>
import CreatePageButton from './CreatePageButton'
export default {
  components: {
    CreatePageButton
  },
  computed: {
    version () {
      return this.$store.getters['version']()
    },
    siteID () {
      return this.$store.getters['site/id']()
    },
    siteName () {
      return this.$store.getters['site/name']()
    }
  }
}
</script>
