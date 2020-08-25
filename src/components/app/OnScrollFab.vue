<template>
  <v-btn
    v-scroll="onScroll"
    v-show="scrollFab"
    fab
    fixed
    bottom
    right
    color="primary"
    @click="toTop"
    ><v-icon>mdi-arrow-up-thick</v-icon></v-btn>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
export default defineComponent({
  setup () {
    const scrollFab = ref(false)
    const onScroll = (event:{target:HTMLElement}) => {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || event.target.scrollTop || 0
      scrollFab.value = top > 20
    }
    const toTop = () => window.scroll(0, 0)
    return { scrollFab, onScroll, toTop }
  }
})
</script>
