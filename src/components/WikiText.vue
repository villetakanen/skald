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
    'theme',
    'siteid'
  ],
  computed: {
    rended () {
      var rendedContent = this.content

      if (rendedContent === null) rendedContent = 'Missing content'

      rendedContent = wikiLinks(rendedContent, this.siteid)

      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      rendedContent = md.render(rendedContent)

      return rendedContent
    }
  }
}
function wikiLinks (page, siteid) {
  const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'g')
  return page.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    // First we ned to separate written and linked part
    var link = p2
    // If link contains a site id, we use it, if not, we use the parameter siteid
    if (link.includes('/')) {
      const parts = link.split('/')
      return `[${p2}](/#/v/${toURI(parts[0])}/${toURI(parts[1])})`
    } else {
      return `[${p2}](/#/v/${siteid}/${toURI(link)})`
    }
  })
}
function toURI (link) {
  var re = new RegExp('[\\W]', 'g')
  var s = link.replace(re, '-')
  while (s.includes('--')) {
    s = s.split('--').join('-')
  }
  return s.toLowerCase()
}
</script>
