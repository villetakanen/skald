<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <h1>Welcome to Your Vue.js App</h1>
        <p>{{msg}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['msg']
}
</script>
