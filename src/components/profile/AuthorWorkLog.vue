<template>
  <v-card>
    <v-card-text>
      <h1>Pages I have been working on</h1>
      <ul>
      <template v-for="(logentry, index) in pageLog">
        <li :key='index'><a :href='`/#/v/${sitepart(logentry.id)}/${pagepart(logentry.id)}`'>{{logentry.id}}</a></li>
      </template>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    pageLog () {
      return this.$store.getters['author/pageLog']()
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
