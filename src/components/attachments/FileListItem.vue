<template>
  <div class="list_row">

    <!-- div wrapper required for styling svg with the ~same params, than other images -->
    <div class="preview">
      <img v-if="type != 'upload'" :src="url" :alt="name"/>
      <v-icon v-if="type == 'upload'">mdi-file</v-icon>
    </div>
    <p>[attach: <a :href="url">{{name}}</a>]</p>
    <div class="actions">
      <v-btn
        small
        class="ml-2"
        text
        color="primary"
        @click="deleteFile()">Delete</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  props: [
    'name',
    'path',
    'url',
    'type'
  ],
  methods: {
    deleteFile () {
      const storage = firebase.storage()
      const fileRef = storage.ref(this.path)

      fileRef.delete().then(() => {
        this.$emit('refresh', true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
div.list_row {
  margin: 0;
  position: relative;
  padding: 8px;
  line-height: 28px;
  font-size: 16px;
  p {
    margin: 0;
    margin-left: 34px;
    line-height: 28px;
    font-size: 14px;
    color: #666;
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
  div.actions{
    position: absolute;
    right: 16px;
    top: 8px;
  }
}
div.list_row:hover {
  background-color: RGBA(0 ,0 ,0 , 0.2)
}
div.list_row + div.list_row {
  border-top: solid 1px RGBA(255 ,255 ,255 , 0.1)
}
</style>
