<template>
  <v-container>

    <v-row>
      <v-col>
        <TabTitle
          topic="Attachments"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <Loading v-if="loading"/>
            <div v-if="!loading">
               <template v-for="(file, index) in files">
                <div class="attachment" v-bind:key="index">
                  <div class="preview">
                    <img :src="file.path" :alt="file.name"/>
                  </div>
                  <p class="name">[wiki:<a :href="file.path">{{file.name}}</a>]</p>
                  <div class="actions"><v-btn
                    x-small
                    class="ml-2"
                    outlined
                    @click="deleteFile(file.name)">Delete</v-btn>
                  </div>
                  </div>
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
import TabTitle from '../components/TabTitle'

export default {
  components: {
    Loading,
    TabTitle
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
