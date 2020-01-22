<template>
  <div class="changelog">
    <h1>Latest Changes</h1>
    <template v-for="(page, index) in latest">
      <PagelogEntry v-bind:key="index"
        v-if="!page.silent || typeof page.silent ==='undefined'"
        :action="page.action"
        :creator="page.creator"
        :pageid="page.pageid"
        :siteid="page.siteid"
        :date="toDate(page.timestamp)"/>
    </template>
  </div>
</template>
<script>
import PagelogEntry from './PagelogEntry'

export default {
  components: {
    PagelogEntry
  },
  computed: {
    latest () {
      return this.$store.getters['pageLog/latest']()
    }
  },
  methods: {
    toDate (timestamp) {
      if (timestamp === null || typeof timestamp === 'undefined') return '...'
      const seconds = timestamp.seconds
      if (seconds === null || typeof seconds === 'undefined') return '...'
      var lastChangeDate = new Date(1970, 0, 1) // Epoch
      lastChangeDate.setSeconds(seconds)
      const s = lastChangeDate.toISOString().split('T')
      return s[0] + ' ' + s[1].substring(0, 8)
    }
  }
}
</script>
<style scoped>
h1 {
  font-weight: 300;
  font-size: 22px;
}
div.changelog{
  margin: 8px;
}
</style>
