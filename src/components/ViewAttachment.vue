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
        v-on:uploaded="refresh"
        v-on:cancel="cancel"
        />
    </v-dialog>
  </div>
</template>
<script>
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
    dialog: false,
    url: null,
    exists: false
  }),
  mounted () {
    this.refresh()
  },
  methods: {
    cancel () {
      this.dialog = false
    },
    refresh () {
      this.dialog = false
      this.$fireStoreURL(this.path).then((refurl) => {
        this.url = refurl
        this.exists = true
      }).catch((error) => {
        console.log(error.code)
        this.url = null
        this.exists = false
      })
    }
  }
}
</script>
