<template>
  <div class="wikicontent">
    <component v-bind:is="rendedContent"></component>
  </div>
</template>

<script lang="ts">
import VueCompositionApi, { defineComponent, computed } from '@vue/composition-api'
import { useSite } from '@/lib/useSite'

export default defineComponent({
  props: {
    html: {
      type: [String],
      required: true
    }
  },
  setup (props) {
    const rendedContent = computed(() => {
      const r = props.html
      return {
        template: '<div>' + r + '</div>'
      }
    })
    return { rendedContent }
  }
})
</script>
