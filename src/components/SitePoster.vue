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
      <div v-if="sitePosterURL !== null" class="previewBox">
        <img class="preview" :alt="siteid" :src="sitePosterURL"/>
        <h1 :class="`pagetitle siteTitlePreview ${titleColorClass}`">{{siteName}}</h1>
        <v-btn
          x-small
          class="ma-1"
          color="black"
          @click="changeTitleColor('pageTitleLight')">
          <span style="color:white">white</span></v-btn>
        <v-btn
          x-small
          class="ma-1"
          color="white"
          @click="changeTitleColor('pageTitleDark')">
          <span style="color:black">black</span></v-btn>
        <v-btn
          x-small
          class="ma-1"
          color="black"
          @click="changeTitleColor('pageTitleLightBlue')">
          <span style="color:#0091EA">#0091EA</span></v-btn>
        <v-btn
          x-small
          class="ma-1"
          color="white"
          @click="changeTitleColor('pageTitleDarkGreen')">
          <span style="color:darkgreen">darkgreen</span></v-btn>
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
    // titleColorClass: 'pageTitleLight'
  }),
  computed: {
    sitePosterURL () {
      return this.$store.getters['sites/posterURL']()
    },
    isAuthz () {
      return this.$store.getters['isAuthz']()
    },
    siteName () {
      return this.$store.getters['site/name']()
    },
    titleColorClass () {
      return this.$store.getters['site/titleColorClass']()
    }
  },
  methods: {
    changeTitleColor (newColor) {
      // if (this.titleColorClass === 'pageTitleLight') this.titleColorClass = 'pageTitleDark'
      // else this.titleColorClass = 'pageTitleLight'
      this.$store.dispatch('site/setTitleColor', newColor)
    },
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
h1.siteTitlePreview {
  position: absolute;
  top: 16px;
  left: 16px;
}
div.previewBox{
  position: relative;
}

</style>
