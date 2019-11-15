<template>
  <v-app>
    <div
      id="cover"
      :class="theme"
      :style="sitePoster">
      <div
        v-if="sitePoster !== null"
        id="cover-image"
        >
      </div>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      app
      >
      <NavigationDrawer/>
    </v-navigation-drawer>

    <v-app-bar
      app
      >

      <v-btn icon @click.stop="drawer = !drawer">
        <img style="height:42px" alt="S" src="./assets/logo.png" id="sitelogo"/>
      </v-btn>

      <v-toolbar-title class="headline text-uppercase">
        Skald<span style="text-transform:lowercase;font-style:italic;font-size:0.7em">β</span> {{version}}
      </v-toolbar-title>

     <v-spacer></v-spacer>

      <AccountMenu class="mx-2"/>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-content>
      <v-snackbar
        v-model="newContent"
        bottom
        left
        :timeout="timeout">
          Update available!
        <v-spacer />
        <v-btn
          dark
          color="primary"
          @click="refreshApp"
        >Reload App</v-btn>
        <v-btn
          icon
          @click.native="newContent=!newContent"
        ><v-icon>mdi-close</v-icon></v-btn></v-snackbar>
    </v-content>
    <ErrorDialog/>
    <PageNotFoundDialog/>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer'
import AccountMenu from './components/AccountMenu'
import ErrorDialog from './components/ErrorDialog'
import PageNotFoundDialog from './components/PageNotFoundDialog'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    AccountMenu,
    ErrorDialog,
    PageNotFoundDialog
  },
  data: () => ({
    registration: null,
    refreshing: false,
    newContent: false,
    drawer: null,
    timeout: 10000000,
    theme: 'Skald'
    //
  }),
  computed: {
    version () {
      return this.$store.getters['version']()
    },
    sitePoster () {
      const url = this.$store.getters['sites/posterURL']()
      if (url === null) return ''
      return `background-image:url('${url}');`
    }
  },
  created () {
    this.$vuetify.theme.dark = true
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return
      this.refreshing = true
      window.location.reload()
    })
  },
  methods: {
    showRefreshUI (e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail
      this.newContent = true
    },
    refreshApp () {
      this.newContent = false
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return }
      this.registration.waiting.postMessage('skipWaiting')
    }
  }
}
</script>

<style lang="sass">
@import './styles/skald.scss'
@import './styles/hood.scss'
@import './styles/quick.scss'
@import './styles/dd.scss'

</style>
