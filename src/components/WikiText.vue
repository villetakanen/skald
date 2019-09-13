<template>
  <div class="wikipage">
    <div :class="this.theme">
      <div v-html="rended"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'content',
    'theme'
  ],
  computed: {
    rended () {
      return '<h1>A header</h1><p>with some text<p>'
    }
  }
}
</script>
