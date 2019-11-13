<template>
  <div :style="wide">
    <img
      class = "attachment"
      alt="-" style="max-width:100%; max-height:100%" v-if="!loading" :src="url"/>
    <p v-if="loading && !view"><em>{{message}}</em>
      &nbsp;<v-btn v-if="!view" @click="dialog=!dialog" color="primary" text>upload it</v-btn>
    </p>
    <v-dialog
      v-model="dialog"
      max-width="800"
      >
      <CardFileUpload
        :path="path"
        v-on:uploaded="refresh"/>
    </v-dialog>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/storage'
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
    loading: true,
    url: '',
    message: 'Loading...',
    dialog: false
  }),
  created () {
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
  }
}
</script>
