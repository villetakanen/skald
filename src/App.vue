<template>
  <v-app>
    <v-app-bar app>
      <v-icon>mdi-menu</v-icon>
      <v-toolbar-title class="headline text-uppercase">
        Skald<span style="text-transform:lowercase;font-style:italic;font-size:0.7em">β</span> {{version}}
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>

    <v-content>
      <v-snackbar
        v-model="newContent"
        bottom
        left
        timeout="1000000">
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
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    registration: null,
    refreshing: false,
    newContent: false
    //
  }),
  computed: {
    version () {
      return this.$store.getters['version']()
    }
  },
  created () {
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
