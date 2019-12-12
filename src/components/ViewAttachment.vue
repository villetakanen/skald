<template>
  <div :style="wide">
    <!-- This is the image itself, if it exists -->
    <img
      class = "attachment"
      alt="-" style="max-width:100%; max-height:100%" v-if="exists" :src="url"/>
    <!-- upload -->
    <p v-if="!exists && !view">
      &nbsp;<v-btn v-if="!view" @click="dialog=!dialog" color="primary" text>upload {{path}}</v-btn>
    </p>
    <v-dialog
      v-model="dialog"
      max-width="800"
      >
      <CardFileUpload
        :path="path"
        />
    </v-dialog>
  </div>
</template>
<script>
// import firebase from 'firebase/app'
// import 'firebase/storage'
import CardFileUpload from './CardFileUpload'

export default {
  props: [
    'wide',
    'path',
    'view'
  ],
  components: {
    CardFileUpload
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    url () {
      return this.$fireStoreURL(this.path)
    },
    exists () {
      return this.$store.getters['attachments/exists'](this.path)
    }
  }
  /* created () {
    /* console.log('Loading attachment:', this.path)
    let cachedURL = localStorage.getItem(this.path)
    console.log('Got:', cachedURL)

    if (!cachedURL) {
      // Get a reference to the storage service, which is used to create references in your storage bucket
      const storage = firebase.storage()

      var pathRef = storage.ref(this.path)

      pathRef.getDownloadURL().then((url) => {
        this.url = url
        this.loading = false
      }).catch((err) => {
        this.message = this.path + ' not found.'
        console.log(err.message)
      })
    } else {
      this.loading = false
      this.url = cachedURL
    } * /
  },
  methods: {
    refresh () {
      const storage = firebase.storage()

      var pathRef = storage.ref(this.path)

      pathRef.getDownloadURL().then((url) => {
        this.url = url
        this.loading = false
      }).catch((err) => {
        this.message = this.path + ' not found.'
        console.log(err.message)
      })
      this.dialog = false
    }
  } */
}
</script>
