<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>{{ page.name }} <v-chip small v-if="page.category">{{page.category}}</v-chip></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        :to="`/v/${site.siteid}/${page.pageid}`">{{$t('actions.cancel')}}</v-btn>
      <v-btn
        icon
        class="mx-2"
        @click="preview=!preview"
        ><v-icon v-if="!preview">mdi-eye</v-icon>
        <v-icon v-if="preview">mdi-pen</v-icon></v-btn>
      <v-btn
        @click="publish"
        color="primary"
        >Publish</v-btn>
    </v-toolbar>
      <v-card-text>
        <div
          v-if="!preview"
          style="margin:-8px"
          class="wikipage">
          <div :class="site.theme">
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
        </div>
        <div
          v-if="preview"
          class="wikipage">
          <div :class="site.theme">
            <WikiContent :html="editorData"/>
          </div>
        </div>
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
import { useSite } from '@/lib/useSite'
import router from '@/router'
import WikiContent from '@/components/page/WikiContent.vue'

Vue.use(CKEditor)

export default defineComponent({
  components: {
    WikiContent
  },
  setup (props) {
    const { page } = usePage()
    const { site } = useSite()
    const preview = ref(false)

    const editorData = computed({
      get: () => {
        if (!page) return ''
        if (page.value.htmlContentDraft) return page.value.htmlContentDraft
        else if (page.value.htmlContent) return page.value.htmlContent
        const skaldmd = new Skaldmd(page.value.siteid)
        return skaldmd.toHtml(page.value.content)
      },
      set: (val) => {
        const db = firebase.firestore()
        const draftRef = db.collection('sites').doc(page.value.siteid).collection('pages').doc(page.value.pageid)
        draftRef.update({ htmlContentDraft: val })
      }
    })

    const publish = () => {
      const db = firebase.firestore()
      const draftRef = db.collection('sites').doc(page.value.siteid).collection('pages').doc(page.value.pageid)
      draftRef.update({ htmlContent: editorData.value }).then(() => {
        router.push(`/v/${site.value.siteid}/${page.value.pageid}`)
      })
    }

    const editorSetup = reactive({
      editor: ClassicEditor,
      editorConfig: {
      }
    })
    onMounted(() => {
      // Very blunt way to force override of ckeditor bundle conflict with vue-cli
      document.head.insertAdjacentHTML('beforeend', `<style>:root {
  /* Overrides the border radius setting in the theme. */
  --ck-border-radius: 4px;

  /* Overrides the default font size in the theme. */
  --ck-font-size-base: 14px;

  --ck-color-base-background:  black;
  --ck-color-base-foreground:  #222;
  --ck-color-base-border:  #333;
  --ck-color-base-action: hsl(104, 44%, 48%);
  --ck-color-base-focus: hsl(209, 92%, 70%);
  --ck-color-base-text: #eee;
  --ck-color-base-active: hsl(208, 88%, 52%);
  --ck-color-base-active-focus: hsl(208, 88%, 47%);
  --ck-color-base-error: hsl(15, 100%, 43%);
}</style>`)
    })

    return { ...toRefs(editorSetup), editorData, page, preview, publish, site }
  }
})
</script>

<!--style lang="sass">
@import '@/styles/ckeditor.scss'
</style-->
