<template>
  <div :class="theme">
    <div class="page-container">
      <v-container
        fluid
        grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title>A Site!</v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    theme () {
      if (this.$store.getters['binder/theme']() === null) return 'Skald site-frontpage'
      return this.$store.getters['binder/theme']() + ' site-frontpage'
    }
  }
}
</script>
