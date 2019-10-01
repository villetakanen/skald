<template>
  <div class="wikipage">
    <div :class="this.theme">
      <!--div v-html="rended"></div-->
      <component v-bind:is="rended"></component>
    </div>
  </div>
</template>

<script>
import ViewAttachment from './ViewAttachment.vue'
import Vue from 'vue'
Vue.component('ViewAttachment', ViewAttachment)

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

      // These we need to run on html
      rendedContent = attachLinks(rendedContent, this.siteid)

      return {
        template: '<div>' + rendedContent + '</div>'
      }
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
function attachLinks (page, siteid) {
  const re = new RegExp('([\\[(]attach:)(.+?)([\\])])', 'g')
  return page.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    if (p2.includes(':')) {
      const parts = p2.split(':')
      if (parts[1].trim() === 'wide') return `<ViewAttachment wide="margin:0 -16px" path="${siteid}/${parts[0]}"/>`
      if (parts[1].trim() === 'sm') return `<ViewAttachment wide="height:128px" path="${siteid}/${parts[0]}"/>`
      if (parts[1].trim() === 'xs') return `<ViewAttachment wide="height:56px;width:56px" path="${siteid}/${parts[0]}"/>`
    }
    return `<ViewAttachment wide="text-align:center" path="${siteid}/${p2}"/>`
  })
}
</script>
