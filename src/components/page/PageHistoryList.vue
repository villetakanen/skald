<template>
  <div>
    <h4>Past revisions</h4>
    <template v-for="(entry, index) in revisions">
      <p v-bind:key="index">
        <router-link :to="`/r/${siteid}/${pageid}/${index}`">{{index}} - {{entry.author}}</router-link>
      </p>
    </template>
  </div>
</template>

<script>
export default {
  props: [
    'pageid',
    'siteid'
  ],
  computed: {
    revisions () {
      return this.$store.getters['binder/revisions']()
    }
  }
}
</script>
