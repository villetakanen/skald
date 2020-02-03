<template>
  <v-card>
    <v-card-title>My Recent Changes</v-card-title>
    <v-card-text>
      <ul>
      <template v-for="(logentry, index) in pageLog">
        <li :key='index'><a :href='`/#/v/${sitepart(logentry.id)}/${pagepart(logentry.id)}`'>{{logentry.id}}</a></li>
      </template>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
import _ from 'lodash'

export default {
  computed: {
    pageLog () {
      const log = _.sortBy(this.$store.getters['author/pageLog'](), ['seconds'])
      return log.reverse()
    }
  },
  methods: {
    sitepart (id) {
      return id.split('.')[0]
    },
    pagepart (id) {
      return id.split('.')[1]
    }
  }
}
</script>
