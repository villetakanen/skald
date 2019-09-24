<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Description</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isAuthz"
        @click="save">Save</v-btn>
    </v-toolbar>
    <v-card-text>
      <template v-if="!isAuthz">
        {{description}}
      </template>
      <v-form
        v-if="isAuthz"
        submit.prevent="saveDescription">
        <v-text-field
            v-model="description"
            filled
            ></v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    description: ''
  }),
  mounted () {
    this.description = this.$store.getters['sites/description']()
  },
  computed: {
    isAuthz () {
      return this.$store.getters['isAuthz']()
    }
  },
  methods: {
    save () {
      this.$store.dispatch('sites/setDescription',
        this.description).then(() => {
        this.description = this.$store.getters['sites/description']()
      })
    }
  }
}
</script>
