<template>
  <div style="margin:-8px">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    ---- <br/>
    <div v-html="editorData"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

Vue.use(CKEditor)

export default defineComponent({
  setup () {
    const editorSetup = reactive({
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
        fontColor: '#333'
      }
    })

    return { ...toRefs(editorSetup) }
  }
})
</script>

<style lang="sass">
@import '@/styles/ckeditor.scss'
</style>
