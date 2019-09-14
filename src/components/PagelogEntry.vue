<template>
  <div class="pagelog-entry">
    <div class="pagelog-type">
    <v-icon>mdi-file-document-box-plus-outline</v-icon>
    </div>
    <div class="pagelog-details">
      A Pagelog Entry:  {{action}},
    {{creator}},
    {{pageid}},
    {{siteid}},
    {{date}}</div>
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
}
</style>
