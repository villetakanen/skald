<template>
  <v-dialog
    v-model="dialog"
    persistent max-width="570">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
        id="navi-add-page-action"
        v-on="on"
        v-bind="attrs"
        @click="openDialog">
        <v-list-item-action><v-icon>mdi-file-plus</v-icon></v-list-item-action>
        <v-list-item-title>{{$t('actions.createPage')}}</v-list-item-title>
      </v-list-item>
    </template>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup (props) {
    const dialog = ref(false)
    return { dialog }
  }
})
</script>
