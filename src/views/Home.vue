<template>
  <div>
      <div style="text-align:center;padding:16px">
        <img alt="V" src="../assets/fox.svg" style="max-width: 128px"/>
      </div>
      <SiteList />
    <v-card>
      <LatestChanges />
    </v-card>
  </div>
</template>

<script>
import LatestChanges from '../components/LatestChanges'
import SiteList from '../components/SiteList'

export default {
  components: {
    LatestChanges,
    SiteList
  }
}
</script>
