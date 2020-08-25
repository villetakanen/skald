<template>
  <div class="tabtitle">
    <h1
      v-if="sub"
      :class="`subtopic ${titleColorClass}`">
      <template v-if="!sublink">{{ sub }}</template>
      <router-link
        v-if="sublink"
        :to="sublink"
        :class="titleColorClass"
        >{{ sub }}</router-link></h1>
    <h1
      v-if="topic"
      :class="`topic ${titleColorClass}`">
      <template v-if="!link">{{ topic }}</template>
      <router-link
        v-if="link"
        :to="link"
        :class="titleColorClass"
        >{{ topic }}</router-link></h1>
  </div>
</template>

<script lang="ts">
import VueCompositionApi, { defineComponent, computed } from '@vue/composition-api'
import { useSite } from '@/lib/useSite'

export default defineComponent({
  props: {
    topic: {
      type: [String],
      required: true
    },
    link: {
      type: [String],
      required: false
    },
    sub: {
      type: [String],
      required: false
    },
    sublink: {
      type: [String],
      required: false
    }
  },
  setup (props) {
    const { site } = useSite()
    const titleColorClass = computed(() => site.value.titleColorClass)
    return { titleColorClass }
  }
})
</script>

<style lang="scss" scoped>
div.tabtitle{
  margin: 0;
  padding: 0;
  h1 {
    font-weight: 300;
    margin: 0;
    padding: 0;
    a {
      text-decoration: none;
    }
  }
  h1+h1 {margin-top: 4px}
  h1.subtopic{
    font-size: 16px;
    line-height: 16px;
  }
  h1.topic{
    font-size: 32px;
    line-height: 32px;
  }
}
</style>
