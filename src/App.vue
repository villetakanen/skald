<template>
  <v-app :class="theme">
    <div
      id="cover"
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
      clipped
      >
      <NavigationDrawer/>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img style="height:48px;margin-right:8px;margin-left:8px" alt="S" src="./assets/fox.svg" id="sitelogo"/>
      <v-toolbar-title class="headline text-uppercase">
        {{siteName}}<span style="text-transform:lowercase;font-style:italic;font-size:0.7em">β</span>
        <span style="opacity: 50%; font-size: 0.7em; vertical-align: top; padding-left: 0.5em">{{version}}</span>
      </v-toolbar-title>

     <v-spacer></v-spacer>

      <AccountMenu class="mx-2"/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-main>
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
    </v-main>
    <v-btn
      v-scroll="onScroll"
      v-show="scrollFab"
      fab
      fixed
      bottom
      right
      color="primary"
      @click="toTop"
      ><v-icon>mdi-arrow-up-thick</v-icon></v-btn>
    <ErrorDialog/>
    <PageNotFoundDialog/>
    <CreateProfileDialog/>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackMessage }}
      <v-btn
        color="primary"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer'
import AccountMenu from './components/AccountMenu'
import ErrorDialog from './components/ErrorDialog'
import PageNotFoundDialog from './components/PageNotFoundDialog'
import CreateProfileDialog from './components/CreateProfileDialog'

export default {
  name: 'App',
  components: {
    NavigationDrawer,
    AccountMenu,
    ErrorDialog,
    PageNotFoundDialog,
    CreateProfileDialog
  },
  data: () => ({
    registration: null,
    refreshing: false,
    newContent: false,
    drawer: false,
    timeout: 10000000,
    // theme: 'Skald',
    scrollFab: false,
    snackbar: false
    //
  }),
  computed: {
    version () {
      return this.$store.getters.version()
    },
    siteName () {
      return this.$store.getters.siteName()
    },
    theme () {
      return this.$store.getters['site/theme']()
    },
    sitePoster () {
      const url = this.$store.getters['sites/posterURL']()
      if (url === null) return ''
      return `background-image:url('${url}');`
    },
    snackMessage () {
      return this.$store.getters.snack()
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
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.scrollFab = top > 20
    },
    toTop () {
      window.scroll(0, 0)
    },
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
@import './styles/print.scss'

</style>
