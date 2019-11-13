<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            Attachments!
            <Loading v-if="loading"/>
            <div v-if="!loading">
               <template v-for="(file, index) in files">
                <p class="file" v-bind:key="index">
                  {{file.name}}
                  <span class="path">{{file.path}}</span>
                  <v-btn
                    x-small
                    class="ml-2"
                    outlined
                    @click="deleteFile(file.name)">Delete</v-btn>
                  </p>
              </template>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loading from '../components/Loading'

export default {
  components: {
    Loading
  },
  props: [
    'siteid'
  ],
  computed: {
    loading () {
      return this.$store.getters['attachments/loading']()
    },
    files () {
      return this.$store.getters['attachments/files']()
    }
  },
  mounted: function () {
    this.$store.dispatch('attachments/fetch', { siteid: this.siteid })
  },
  methods: {
    deleteFile (filename) {
      this.$store.dispatch('attachments/delete', {
        siteid: this.siteid,
        filename: filename
      })
    }
  }
}
</script>

<style lang="scss" scoped>
p.file{
  margin: 0;
  padding: 0;
  line-height: 28px;
  font-size: 16px;
}
</style>
