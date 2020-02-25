<template>
  <v-container pa-0 ma-0>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Images</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <Loading center v-if="loading"/>
          <template v-if="!loading">
            <template v-for="(file, index) in fileList">
              <FileListItem
                v-bind:key="index"
                :name="file.name"
                :url="file.path"
                :path="`${siteid}/${file.name}`"
                v-on:refresh="refresh()"/>
            </template>
          </template>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script>
import Loading from '../Loading.vue'
import FileListItem from '../attachments/FileListItem'
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  components: {
    Loading,
    FileListItem
  },
  props: [
    'siteid'
  ],
  data: () => ({
    fileList: [],
    loading: true
  }),
  methods: {
    refresh () {
      this.fileList = []

      const storage = firebase.storage()

      const listRef = storage.ref(this.siteid)

      listRef.listAll().then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        })
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((url) => {
            this.fileList.push({
              name: itemRef.name,
              path: url
            })
          })
        })
        this.loading = false
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
