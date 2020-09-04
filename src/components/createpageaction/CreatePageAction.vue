<template>
  <v-dialog
    v-model="dialog"
    persistent max-width="570">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
        id="navi-add-page-action"
        v-on="on"
        v-bind="attrs">
        <v-list-item-action><v-icon>mdi-file-plus</v-icon></v-list-item-action>
        <v-list-item-title>{{$t('actions.createPage')}}</v-list-item-title>
      </v-list-item>
    </template>
      <v-card>
        <v-card-title>{{$t('createPage.title')}}</v-card-title>
        <v-card-text>
          <v-text-field
              id="new-page-name"
              :label="$t('createPage.pageSlugLabel')"
              :placeholder="$t('createPage.pageSlugPlaceholder')"
              filled
              v-model="name"
              ></v-text-field>
          <p>URL: mekanismi.web.app/#/v/{{site.siteid}}/{{newPageid}}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">{{$t('actions.cancel')}}</v-btn>
          <v-btn
            color="primary"
            :disabled="!name"
            @click="createPage()">{{$t('actions.createPage')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { skaldURI } from '@/plugins/skaldfire'
import { useSite } from '@/lib/useSite'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useAppState } from '@/lib/useAppState'
import { useProfile } from '@/lib/useProfile'
import { useParams } from '@/lib/useParams'
import { usePagelog } from '@/lib/usePagelog'

export default defineComponent({
  setup (props) {
    const dialog = ref(false)
    const name = ref('')
    const newPageid = computed(() => skaldURI(name.value))
    const { site } = useSite()
    const createPage = () => {
      const { raiseError } = useAppState()
      if (!newPageid.value) {
        raiseError(
          'Missing id',
          'Can not create a page without an id, please add a title',
          '400'
        )
        dialog.value = false
        return
      }
      const db = firebase.firestore()
      const pageRef = db.collection('sites').doc(site.value.siteid).collection('pages').doc(newPageid.value)
      pageRef.get().then((pageDoc) => {
        if (pageDoc.exists) {
          raiseError(
            'Duplicate id',
            'Can not create a page with the id, please try with another title',
            '409'
          )
        } else {
          const { activeProfile } = useProfile()

          if (!activeProfile.value) {
            raiseError(
              'Missing profile',
              'Internal error, contact support',
              '400')
            return
          }

          // Set page data
          const newPageData = {
            // pageid: newPageid.value,
            // siteid: site.value.siteid,
            creator: activeProfile.value.uid,
            creatorNick: activeProfile.value?.uid,
            name: name.value,
            content: name.value,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
          }
          pageRef.set(newPageData).then(() => {
            const { stamp } = usePagelog()
            stamp('create', site.value.siteid, newPageid.value, site.value.silent)
          })
        }
      })
      dialog.value = false
    }

    const { launchCreatePageDialog } = useAppState()

    interface Params {
      siteid: string,
      pageid?: string
    }

    function launchDialog (trigger:boolean) {
      if (trigger) {
        dialog.value = true
        const params = useParams().value as Params
        if (params.pageid) name.value = params.pageid
        else name.value = params.siteid
        launchCreatePageDialog.value = false
      }
    }

    watch(launchCreatePageDialog, launchDialog)

    return { dialog, name, newPageid, site, createPage }
  }
})
</script>
