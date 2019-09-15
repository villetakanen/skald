<template>
  <div class="pagelog-entry">
    <div class="pagelog-type">
        <v-icon v-if="action === 'create'">mdi-file-document-box-plus-outline</v-icon>
        <v-icon v-if="action === 'update'">mdi-file-document-edit-outline</v-icon>
    </div>
    <div class="pagelog-details">
    <p>{{creator}},
    {{siteid}}/{{pageid}}</p>
    <p>{{date}}</p></div>
  </div>
</template>
<script>
export default {
  props: [
    'action',
    'creator',
    'pageid',
    'siteid',
    'date'
  ]
}
</script>
<style scoped>
div.pagelog-entry{
  display: flex;
  flex-direction: row;
}
div.pagelog-type{
  width: 50px;
  padding: 8px;
}
div.pagelog-entry p{
  margin: 0;
  padding: 0;
}
div.pagelog-entry p:last-of-type{
  padding-bottom: 8px;
}
</style>
