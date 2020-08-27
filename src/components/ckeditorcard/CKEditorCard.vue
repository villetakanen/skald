<template>
  <v-card>
    <v-toolbar><v-toolbar-title>CKEditor alpha</v-toolbar-title></v-toolbar>
      <v-card-text>
        <div style="margin:-8px">
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
        <div v-html="editorData"></div>
      </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { defineComponent, reactive, toRefs, watch, ref, onMounted, computed } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { usePage } from '@/lib/usePage'
import Skaldmd from '@/lib/skaldmd'

Vue.use(CKEditor)

export default defineComponent({
  setup (props) {
    const { page } = usePage()

    const editorData = computed({
      get: () => {
        if (!page) return ''
        if (page.value.htmlContentDraft) return page.value.htmlContentDraft
        else if (page.value.htmlContent) return page.value.htmlContent
        const skaldmd = new Skaldmd(page.value.siteid)
        return skaldmd.toHtml(page.value.content)
      },
      set: (val) => {
        console.log('set', val)
        const db = firebase.firestore()
        const draftRef = db.collection('sites').doc(page.value.siteid).collection('pages').doc(page.value.pageid)
        draftRef.update({ htmlContentDraft: val })
      }
    })
    const editorSetup = reactive({
      editor: ClassicEditor,
      editorConfig: {
      }
    })

    return { ...toRefs(editorSetup), editorData, page }
  }
})
</script>

<style lang="sass">
@import '@/styles/ckeditor.scss'
</style>
