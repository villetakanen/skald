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
import Skaldmd from '../lib/skaldmd'
Vue.component('ViewAttachment', ViewAttachment)

export default {
  props: [
    'content',
    'theme',
    'siteid'
  ],
  computed: {
    rended () {
      // TMP
      // let skaldmd = new Skaldmd(this.content)
      // console.log(skaldmd.toHtml())
      // /TMP

      var rendedContent = this.content

      if (rendedContent === null) rendedContent = 'Missing content'

      rendedContent = wikiLinks(rendedContent, this.siteid)
      rendedContent = siteLinks(rendedContent)

      // These we want to run on html
      rendedContent = statBlocks(rendedContent)

      // const MarkdownIt = require('markdown-it')
      // const md = new MarkdownIt({ html: true })
      // rendedContent = md.render(rendedContent)
      const skaldmd = new Skaldmd()
      rendedContent = skaldmd.toHtml(this.content)
      // rendedContent = skaldmd.toHtml()

      // These we need to run on html
      rendedContent = attachLinks(rendedContent, this.siteid)

      return {
        template: '<div>' + rendedContent + '</div>'
      }
    }
  }
}
/**
 * Takes in the page, and rends the statblocks as HTML table
 */
function statBlocks (page) {
  // console.log(page)
  // const re = new RegExp('<p>stats:([a-zA-Z]|\\s|\\+|\\-|\\d)+<\\/p>', 'g')
  const re = new RegExp('stats:([a-zA-Z]|\\s|\\+|\\-|\\d)+\\n{2}', 'gm')
  return page.replace(re, function (match, offset, string) {
    console.log('splitting:', match)
    const stats = match.split('\n')
    let block = '<table class="statblock">'
    for (let i in stats) {
      let line = stats[i].trim()
      if (!line.includes('stats:') && line.length > 0) {
        // console.log(line)
        const values = line.split(' ')
        block += `<tr><th>${values[0]}</th>`
        if (values.length > 1) block += `<td>${values[1]}</td>`
        if (values.length > 2) block += `<td>${values[2]}</td>`
        block += '</tr>'
      }
    }
    return block + '</table>'
  })
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
function siteLinks (page) {
  const re = new RegExp('([\\[(]site:)(.+?)([\\])])', 'g')
  return page.replace(re, function (match, p1, p2, p3, offset, string) {
    p2 = p2.trim()
    return `[${p2}](/#/v/${toURI(p2)})`
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
