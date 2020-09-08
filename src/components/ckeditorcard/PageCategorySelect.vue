<template>
  <v-select
    :label="$t('editor.categorySelect')"
    v-model="category"
    :items="categories"
    ></v-select>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import 'firebase/firestore'
import { defineComponent, computed, ref } from '@vue/composition-api'
import PageCategorySelect from '@/components/page/PageCategorySelect.vue'
import { usePage } from '@/lib/usePage'

export default defineComponent({
  setup () {
    const { page, categories } = usePage()
    const category = computed({
      get: () => page.value.category,
      set: (category) => {
        const db = firebase.firestore()
        const draftRef = db.collection('sites').doc(page.value.siteid).collection('pages').doc(page.value.pageid)
        draftRef.update({ category: category })
      }
    })
    return { category, categories, page }
  }
})
</script>
