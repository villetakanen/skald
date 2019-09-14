<template>
  <div>

    <div class="style-book-chapter">
      <p>This is a stylebook, with all elements we use shown, for UX design and verification</p>
    </div>

    <div class="style-book-chapter">
      <v-layout wrap>
        <v-flex xs12 md4>
          <p>Theme: Skald</p>
          <WikiText theme="Skald" :content="defaultContent"/>
        </v-flex>
        <v-flex xs12 md4>
          <p>Theme: Hood</p>
          <WikiText theme="Hood" :content="defaultContent"/>
        </v-flex>
        <v-flex xs12 md4>
          <p>Theme: Quick</p>
          <WikiText theme="Quick" :content="defaultContent"/>
        </v-flex>
      </v-layout>
    </div>

    <div class="style-book-chapter">
      <v-btn>v-btn</v-btn>
    </div>
    <div class="style-book-chapter">
      <v-btn color="primary">v-btn primary</v-btn>
    </div>
    <div class="style-book-chapter">
      <v-btn color="secondary">v-btn secondary</v-btn>
    </div>
    <div class="style-book-chapter">
      <v-btn dark>v-btn dark</v-btn>
    </div>

  </div>
</template>
<script>
import WikiText from '../components/WikiText'

export default {
  components: {
    WikiText
  },
  /* data: () => ({
    defaultContent: `# A Wikipage \n\nWith some text.`
  }) */
  computed: {
    defaultContent () {
      const page = this.$store.getters['metaBinder/page']('example-wikipage')
      if (page === null) return ''
      return page.content
    }
  }
}
</script>
<style scoped>
div.style-book-chapter{
  margin: 8px;
  padding: 8px;
}
</style>
