<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Poster</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div v-if="sitePosterURL !== null">
        <img class="preview" :alt="siteid" :src="sitePosterURL"/>
      </div>
      <div v-if="sitePosterURL === null">
        Add an image!
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
// import firebase from 'firebase/app'
// import 'firebase/storage'

export default {
  props: [
    'siteid'
  ],
  computed: {
    sitePosterURL () {
      return this.$store.getters['sites/posterURL']()
    }
  }
  /* data: () => ({
    sitePosterUrl: null
  }),
  /* created () {
    const sitePosterSlug = this.$store.getters['sites/posterURL'](this.siteid)
    if (sitePosterSlug === null) return null

    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage()

    var pathRef = storage.ref(this.siteid + '/' + sitePosterSlug)

    pathRef.getDownloadURL().then((url) => {
      this.sitePosterUrl = url
    }).catch((err) => {
      this.message = this.siteid + '/' + sitePosterSlug + ' not found.'
      console.log(err.message)
    })
  } */
}
</script>

<style scoped>
img.preview {
  width:100%;
}
</style>
