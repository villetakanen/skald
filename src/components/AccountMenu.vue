<template>
  <div>
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          color="primary"
          v-on="on">
          <v-icon
            v-if="!isAuthz">mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthz () {
      return this.$store.getters['isAuthz']()
    }
  }
}
</script>
