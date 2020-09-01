<template>
  <v-card>
    <v-card-title>{{$t('editor.pageMetadataTitle')}}</v-card-title>
    <v-card-text>
      <v-text-field
        :label="$t('editor.pageName')"
        v-model="pageName"></v-text-field>
      <PageCategorySelect/>

    </v-card-text>
    <v-card-actions>
      <v-dialog
        v-model="deleteConfirm"
        persistent max-width="570">
        <template v-slot:activator="{ on, attrs }">
          <v-spacer></v-spacer>
          <v-btn
            text
            v-on="on"
            v-bind="attrs"
            color="secondary">{{$t('actions.deletePage')}}</v-btn>
         </template>
         <v-card>
           <v-card-title>{{$t('editor.deletePageTitle')}}</v-card-title>
           <v-card-text>{{$t('editor.deletePageInfo')}}</v-card-text>
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn
               text
               @click="deletePage()">{{$t('actions.deletePage')}}</v-btn>
             <v-btn
               color="primary"
               @click="deleteConfirm = ! deleteConfirm">{{$t('actions.cancel')}}</v-btn>
           </v-card-actions>
         </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import firebase from 'firebase/app'
import 'firebase/firestore'
import { defineComponent, computed, ref } from '@vue/composition-api'
import PageCategorySelect from '@/components/ckeditorcard/PageCategorySelect.vue'
import { usePage } from '@/lib/usePage'
import router from '@/router'
import { useProfile } from '@/lib/useProfile'
import { useSite } from '@/lib/useSite'

export default defineComponent({
  components: {
    PageCategorySelect
  },
  setup () {
    const deleteConfirm = ref(false)
    const { page } = usePage()
    const pageName = computed({
      get: () => page.value.name,
      set: (name) => {
        const db = firebase.firestore()
        const draftRef = db.collection('sites').doc(page.value.siteid).collection('pages').doc(page.value.pageid)
        draftRef.update({ name: name })
      }
    })

    const deletePage = () => {
      const db = firebase.firestore()
      const pageRef = db.collection('sites').doc(page.value.siteid).collection('pages').doc(page.value.pageid)
      pageRef.delete().then(() => {
        const { activeProfile } = useProfile()
        const { site } = useSite()
        const stamp = {
          action: 'create',
          pageid: page.value.pageid,
          siteid: site.value.siteid,
          creator: activeProfile.value?.uid,
          creatorNick: activeProfile.value?.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          silent: site.value.silent
        }
        const logRef = db.collection('pagelog').doc(site.value.siteid + '.' + page.value.pageid)
        logRef.set(stamp)

        const siteRef = db.collection('sites').doc(site.value.siteid)
        siteRef.update({ lastUpdate: firebase.firestore.FieldValue.serverTimestamp() })
      })
      router.push('/v/' + page.value.siteid)
      deleteConfirm.value = false
    }

    return { page, pageName, deleteConfirm, deletePage }
  }
})
</script>
