<template>
    <v-container
    fluid
    grid-list-md>
    <v-layout wrap>
    <template v-for="(site, index) in sites">
      <v-flex xs6 md3 v-bind:key="index">
        <v-card
          :class="site.theme">
          <v-img
            class="white--text"
            height="128px"
            src="../assets/skald-poster.svg">
            <v-card-title><router-link :to="`/v/${index}`">{{site.name}}</router-link>
          </v-card-title></v-img>
          <v-card-text>
            {{site.description}}
          </v-card-text>
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
