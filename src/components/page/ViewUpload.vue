<template>
  <div class="fileUpload">
    <span v-if="loading"><Loading inline/></span>
    <span v-if="!loading">
      <template v-if="!exists && isAuthz">
        <span class="filename">{{fileName}}</span> not found:
        <FileUploadButton
          :siteid="siteid"
          :filename="fileName"
          inline
          v-on:refresh="this.refresh"
        />
      </template>
      <template v-if="exists">
        <a :href="url"><span class="filename">{{fileName}}</span></a>
      </template>
    </span>
  </div>
</template>

<script>
import Loading from '../Loading'
import FileUploadButton from '../attachments/FileUploadButton'

export default {
  components: {
    Loading,
    FileUploadButton
  },
  props: [
    'title',
    'path'
  ],
  data: () => ({
    loading: true,
    exists: false,
    url: null
  }),
  computed: {
    fileName () {
      if (this.title) return this.title
      if (this.path) return this.path.split('/')[2]
      return 'The ViewUpload tag was initiated without a title or path to file'
    },
    siteid () {
      return this.path.split('/')[0]
    },
    isAuthz () {
      return this.$store.getters.isAuthz()
    }
  },
  methods: {
    refresh () {
      this.loading = true
      this.$fireStoreURL(this.path).then((refurl) => {
        this.url = refurl
        this.exists = true
        this.loading = false
      }).catch((error) => {
        if (error.code && error.code === 'storage/object-not-found') {
          this.url = null
          this.exists = false
        } else this.$store.commit('error', error)
        this.loading = false
      })
    }
  },
  mounted () {
    this.refresh()
  }
}
</script>
