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
      var rendedContent = this.content

      if (rendedContent === null) rendedContent = 'Missing content'

      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      rendedContent = md.render(rendedContent)

      return rendedContent
    }
  }
}
</script>
