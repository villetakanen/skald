<template>
  <div>
      <template v-for="(item, index) in visiblePagelog.reverse()">
        <PagelogItem
          v-bind:key="index"
          :item="item"/>
      </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, ref, computed, watch } from '@vue/composition-api'
import PagelogItem from './PagelogItem.vue'
import { usePagelog } from '@/lib/usePagelog'
Vue.use(VueCompositionApi)

export default defineComponent({
  components: {
    PagelogItem
  },
  props: {
    siteid: {
      type: [String],
      required: false
    },
    count: {
      type: [Number],
      required: false
    }
  },
  setup (props) {
    const { pagelog } = usePagelog()
    const visiblePagelog = computed(() => {
      if (!props.count) return pagelog.value
      const arr = pagelog.value
      const subs = arr.length - props.count > -1 ? arr.length - props.count : 0
      return arr.slice(subs, arr.length)
    })
    return { visiblePagelog, pagelog }
  }
})
</script>
