<template>
  <div class="reader">
    <h1>View Page</h1>
    <WikiText content="a"/>
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
  }
}
</script>
