<template>
  <div :class="`${wide} attachment`">
    <!-- This is the image itself, if it exists -->
    <img
      class = "attachment"
      :alt="path" v-if="exists" :src="url"/>
    <!-- upload -->
    <p v-if="!exists && !view && isAuthz">
      <v-btn
        v-if="!view"
        @click="dialog=!dialog"
        color="primary"
        class="button-add-image"
        text>upload {{path}}</v-btn>
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
import CardFileUpload from '../attachments/CardFileUpload'

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
  computed: {
    isAuthz () {
      return this.$store.getters.isAuthz()
    }
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
        if (error.code && error.code === 'storage/object-not-found') {
          this.url = null
          this.exists = false
        } else this.$store.commit('error', error)
      })
    }
  }
}
</script>

<style scoped>
.inline {
  display: inline-block;
}
</style>
