<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Poster</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isAuthz"
        @click="dialog=!dialog">Change</v-btn>
    </v-toolbar>
    <v-card-text>
      <div v-if="sitePosterURL !== null">
        <img class="preview" :alt="siteid" :src="sitePosterURL"/>
      </div>
      <div v-if="sitePosterURL === null">
        Add an image!
      </div>
    </v-card-text>
    <v-dialog
      v-model="dialog"
      max-width="800">

      <v-card>
        <v-card-title>Change site poster</v-card-title>
        <v-card-text>
          <v-file-input ref="file" v-model="file2"></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" outlined @click="upload">Upload</v-btn>
          <v-btn color="primary" text>cancel</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-card>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  props: [
    'siteid'
  ],
  data: () => ({
    dialog: null,
    file2: null
  }),
  computed: {
    sitePosterURL () {
      return this.$store.getters['sites/posterURL']()
    },
    isAuthz () {
      return this.$store.getters['isAuthz']()
    }
  },
  methods: {
    upload () {
      // var preview = document.querySelector('#demoimg')
      var reader = new FileReader()

      /* reader.addEventListener('load', function () {
        preview.src = reader.result
      }, false) */

      if (this.file2) {
        reader.readAsDataURL(this.file2)
      }

      // Create a root reference
      const storageRef = firebase.storage().ref()
      // Create site reference
      const fileRef = storageRef.child(this.siteid + '/poster.jpg')
      fileRef.put(this.file2).then((snapshot) => {
        this.$emit('uploaded', true)
        this.$store.dispatch('sites/openSite', this.siteid)
        this.dialog = false
      })
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
