<template>
  <div>
    <h4>Past revisions</h4>
    <template v-for="(entry, index) in revisions">
      <p v-bind:key="index">
        <router-link :to="`/r/${siteid}/${pageid}/${entry.id}`">{{toDate(entry.id)}} - {{entry.author}}</router-link>
      </p>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: [
    'pageid',
    'siteid'
  ],
  computed: {
    revisions () {
      const revisions = this.$store.getters['binder/revisions']()
      return _.reverse(_.sortBy(revisions, 'id'))
    }
  },
  methods: {
    toDate (seconds) {
      if (seconds === null || typeof seconds === 'undefined') return '...'
      var lastChangeDate = new Date(1970, 0, 1) // Epoch
      lastChangeDate.setSeconds(seconds)
      const s = lastChangeDate.toISOString().split('T')
      return s[0] + ' ' + s[1].substring(0, 8)
    }
  },
  mounted () {
    this.$store.dispatch('binder/fetchRevisions')
  }
}
</script>
