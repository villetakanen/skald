<template>
  <div class="reader">
    <h1>View Page</h1>
    <WikiText :content="content"/>
    <LatestChanges />
  </div>
</template>

<script>
import LatestChanges from '../components/LatestChanges'
import WikiText from '../components/WikiText'

export default {
  components: {
    LatestChanges,
    WikiText
  },
  props: [
    'pageid',
    'siteid'
  ],
  created () {
    this.updatePage(this.siteid, this.pageid)
  },
  watch: {
    '$route' (to, from) {
      this.updatePage(this.siteid, this.pageid)
    }
  },
  computed: {
    content () {
      if (this.$store.getters['binder/content']() === null) return ' '
      return this.$store.getters['binder/content']()
    }
  },
  methods: {
    updatePage (siteid, pageid) {
      if (siteid === null || typeof siteid === 'undefined') siteid = 'skald'
      if (pageid === null || typeof pageid === 'undefined') pageid = siteid
      this.$store.dispatch('binder/openPage', { siteid: siteid, pageid: pageid })
    }
  }
}
</script>
