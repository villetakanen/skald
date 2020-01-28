<template>
  <div class="tabtitle">
    <h1
      v-if="sub"
      :class="`subtopic ${titleColorClass}`">{{sub}}</h1>
    <h1
      v-if="topic"
      :class="`topic ${titleColorClass}`">{{topic}}</h1>
  </div>
</template>

<script>
export default {
  props: [
    'topic',
    'sub'
  ],
  computed: {
    titleColorClass () {
      return this.$store.getters['site/titleColorClass']()
    }
  }
}
</script>

<style lang="scss" scoped>
div.tabtitle{
  margin: 0;
  padding: 0;
  h1 {
    font-weight: 300;
    margin: 0;
    padding: 0;
  }
  h1+h1 {margin-top: 4px}
  h1.subtopic{
    font-size: 16px;
    line-height: 16px;
  }
  h1.topic{
    font-size: 32px;
    line-height: 32px;
  }
}
</style>
