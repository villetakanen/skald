<template>
    <v-container
    fluid
    grid-list-md>
    <v-layout wrap>
    <template v-for="(site, index) in sites">
      <v-flex xs6 md3 v-bind:key="index">
        <v-card :class="site.theme" rounded>
          <v-card-title><router-link :to="`/v/${index}`">{{site.name}}</router-link></v-card-title>
        </v-card>
      </v-flex>
    </template>
    </v-layout>
    </v-container>
</template>
<script>
export default {
  computed: {
    sites () {
      return this.$store.getters['sites/list']()
    }
  }
}
</script>
