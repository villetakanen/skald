<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Uploads</v-toolbar-title>
      <v-spacer/>
      <FileUploadButton :siteid="siteid" v-on:refresh="this.refresh"/>
    </v-toolbar>
    <v-card-text>
      <Loading center v-if="loading"/>
      <div v-if="!loading">
        <template v-for="(file, index) in fileList">
          <FileListItem
                v-bind:key="index"
                :name="file.name"
                :url="file.path"
                type="upload"
                :path="`${siteid}/uploads/${file.name}`"
                v-on:refresh="refresh()"/>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Loading from '../Loading.vue'
import FileUploadButton from '../attachments/FileUploadButton'
import firebase from 'firebase/app'
import 'firebase/storage'
import FileListItem from '../attachments/FileListItem'

export default {
  components: {
    Loading,
    FileUploadButton,
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
    /* bdeleteFile (filename) {
      const storage = firebase.storage()
      const fileRef = storage.ref(this.siteid + '/uploads/' + filename)

      fileRef.delete().then(() => {
        this.refresh()
      })
    }, */
    refresh () {
      this.fileList = []

      const storage = firebase.storage()

      const listRef = storage.ref(this.siteid + '/uploads')

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

<style lang="scss" scoped>
div.attachment{
  margin: 0;
  padding: 8px;
  line-height: 28px;
  font-size: 16px;
  position: relative;
  p{
    margin: 0;
    padding: 0;
    margin-left: 44px;
  }
  div.actions{
    position: absolute;
    right: 16px;
    top: 8px;
  }
  div.preview{
    position: absolute;
    left: 6px;
    top: 6px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-color: rgba(#039be5, 0.7);
    text-align: center;
    img{
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
      align-self: center;
    }
  }
  a {
    text-decoration: none;
  }
}
div.attachment:hover{
  background-color: rgba(0, 0, 0, 0.2)
}
div.attachment + div.attachment {
  border-top: solid 1px #666;
}
</style>
