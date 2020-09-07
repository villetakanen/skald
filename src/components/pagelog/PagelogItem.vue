<template>
  <div class="pagelog-item">
    <div class="pagelog-type">
      <v-icon v-if="item.action === 'create'">mdi-plus</v-icon>
      <v-icon v-if="item.action === 'update'">mdi-file-document-edit-outline</v-icon>
      <v-icon v-if="item.action === 'delete'">mdi-close</v-icon>
    </div>
    <div class="pagelog-details">
      <p class="link"><a :href="'/#/v/' + item.siteid + '/' + item.pageid">{{ item.siteid + '/' + item.pageid }}</a><br/>
      {{ toDate(item.timestamp.seconds) }} {{item.creatorNick}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref } from '@vue/composition-api'
Vue.use(VueCompositionApi)

export default defineComponent({
  props: {
    item: {
      type: [Object],
      required: true
    }
  },
  setup (props) {
    const toDate = (seconds:number|null|undefined) => {
      if (seconds === null || typeof seconds === 'undefined') return '...'
      var lastChangeDate = new Date(1970, 0, 1) // Epoch
      lastChangeDate.setSeconds(seconds)
      const s = lastChangeDate.toISOString().split('T')
      return s[0] + ' ' + s[1].substring(0, 8)
    }
    return { toDate }
  }
})
</script>

<style scoped>
div.pagelog-item{
  display: flex;
  flex-direction: row;
}
div.pagelog-type{
  width: 50px;
  padding: 8px;
}
div.pagelog-entry p{
  margin: 0;
  padding: 0;
}
div.pagelog-entry p:last-of-type{
  padding-bottom: 8px;
}
</style>
