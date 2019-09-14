<template>
  <p>A Pagelog Entry:  {{action}},
    {{creator}},
    {{pageid}},
    {{siteid}},
    {{date}}</p>
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
