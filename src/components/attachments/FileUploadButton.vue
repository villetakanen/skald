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
          <v-btn color="primary" @click="dialog=!dialog" text>cancel</v-btn>
          <v-btn color="primary" @click="upload">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
  props: [
    'siteid'
  ],
  data: () => ({
    dialog: false
  })
}
</script>
