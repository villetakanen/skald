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
                <p v-bind:key="index">
                  {{file.name}}, {{file.path}}</p>
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
  }
}
</script>
