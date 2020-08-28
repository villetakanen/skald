<template>
  <v-card>
    <v-card-title>{{$t('editor.pageMetadataTitle')}}</v-card-title>
    <v-card-text>
      <v-text-field
        :label="$t('editor.pageName')"
        v-model="pageName"></v-text-field>
      <PageCategorySelect/>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import 'firebase/firestore'
import { defineComponent, computed } from '@vue/composition-api'
import PageCategorySelect from '@/components/ckeditorcard/PageCategorySelect.vue'
import { usePage } from '@/lib/usePage'

export default defineComponent({
  components: {
    PageCategorySelect
  },
  setup () {
    const { page } = usePage()
    const pageName = computed({
      get: () => page.value.name,
      set: (name) => {
        const db = firebase.firestore()
        const draftRef = db.collection('sites').doc(page.value.siteid).collection('pages').doc(page.value.pageid)
        draftRef.update({ name: name })
      }
    })
    return { page, pageName }
  }
})
</script>
