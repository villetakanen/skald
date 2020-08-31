<template>
  <div class="wikicontent">
    <component v-bind:is="rendedContent"></component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, computed } from '@vue/composition-api'
import ViewAttachment from '@/components/page/ViewAttachment.vue'
import ViewUpload from '@/components/page/ViewUpload.vue'
import { useSite } from '@/lib/useSite'
import { skaldURI } from '@/plugins/skaldfire'

Vue.component('ViewAttachment', ViewAttachment)
Vue.component('ViewUpload', ViewUpload)

export default defineComponent({
  props: {
    html: {
      type: [String],
      required: true
    }
  },
  setup (props) {
    const { site } = useSite()

    function attachLinks (page:string, siteid:string) {
      const re = new RegExp('([\\[(]attach:)(.+?)([\\])])', 'g')
      return page.replace(re, function (match, p1, p2, p3, offset, string) {
        p2 = p2.trim()
        if (p2.includes('|')) {
          const parts = p2.split('|')
          if (parts[1].trim() === 'wide') return `<ViewAttachment wide="attachment-wide" path="${siteid}/${parts[0]}"/>`
          if (parts[1].trim() === 'sm') return `<ViewAttachment wide="attachment-sm" path="${siteid}/${parts[0]}"/>`
          if (parts[1].trim() === 'xs') return `<ViewAttachment wide="attachment-xs" path="${siteid}/${parts[0]}"/>`
          const opts = parts[1].split(' ')
          let w = ''
          if (opts.includes('inline')) w += ' inline'
          if (opts.includes('sm')) w += ' attachment-sm'
          return `<ViewAttachment wide="${w}" path="${siteid}/${parts[0]}"/>`
        }
        return `<ViewAttachment wide="attachment-normal" path="${siteid}/${p2}"/>`
      })
    }

    function fileLinks (page:string, siteid:string) {
      const re = new RegExp('\\[file:([a-öA-Ö. \\-_0-9]*)\\]', 'gmu')
      return page.replace(re, (match, p1) => {
        p1 = p1.trim()
        if (p1.includes('|')) {
          const parts = p1.split('|')
          return `<ViewUpload path="${siteid}/uploads/${parts[0].trim()}" title="${parts[1].trim()}"/>`
        }
        return `<ViewUpload path="${siteid}/uploads/${p1}"/>`
      })
    }

    function rendWikiLinks (line: string) {
    /* console.log('rendWikiLinks', siteLinkStub, line) */
      const re = new RegExp('([\\[(]wiki:)(.+?)([\\])])', 'gmu')
      line = line.replace(re, (match, p1, p2, p3, offset, string) => {
        p2 = p2.trim()
        const link = p2.includes('|') ? p2.substring(p2.indexOf('|') + 1).trim() : p2
        let url = p2.split('|')[0]
        let siteid = site.value.siteid
        if (url.includes('/')) {
          siteid = skaldURI(url.split('/')[0].trim())
          url = url.split('/')[1]
        }
        url = skaldURI(url.trim())
        return `<a href="/#/v/${siteid}/${url}">${link}</a>`// '<a href' + p2 + '-'
      })
      return line
    }

    const rendedContent = computed(() => {
      let r = props.html
      r = attachLinks(r, site.value.siteid)
      r = fileLinks(r, site.value.siteid)
      r = rendWikiLinks(r)
      return {
        template: '<div>' + r + '</div>'
      }
    })
    return { rendedContent }
  }
})
</script>
