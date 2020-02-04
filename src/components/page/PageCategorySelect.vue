<template>
  <v-select
    v-model="category"
    :items="categories"
    label="Category"
    ></v-select>
</template>

<script>
export default {
  data: () => ({
    categories: ['- none -', 'Character', 'Game Log']
  }),
  computed: {
    category: {
      get () {
        return this.$store.getters['binder/category']()
      },
      set (cat) {
        this.$store.dispatch('binder/category', cat)
      }
    }
  }
}
</script>
