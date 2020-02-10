<template>
  <v-btn
    color="primary"
    @click="dialog=!dialog">Add
    <v-dialog
      v-model="dialog"
      max-width="800"
      >
      <v-card>
        <v-card-title>Upload a File</v-card-title>
        <v-card-text>
          <v-file-input ref="file" v-model="file2"></v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" @click="dialog=!dialog" text>Cancel</v-btn>
          <v-btn color="primary" @click="upload">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  props: [
    'siteid',
    'filename'
  ],
  data: () => ({
    dialog: false,
    file2: null
  }),
  methods: {
    upload () {
      // const reader = new FileReader()
      const filename = this.filename ? this.filename : this.file2.name

      // Create a root reference
      const storageRef = firebase.storage().ref()

      const fileRef = storageRef.child(this.siteid + '/uploads/' + filename)
      fileRef.put(this.file2).then((snapshot) => {
        this.dialog = false
        this.$emit('refresh', true)
      })
    }
  }
}
</script>
