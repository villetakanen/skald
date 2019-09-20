<template>
  <div>
      <div style="text-align:center;padding:16px">
        <img alt="V" src="../assets/fox.svg" style="max-width: 128px"/>
      </div>
      <SiteList count="4"/>
    <v-container
    fluid
    grid-list-md>
      <v-layout wrap>
        <v-flex xs12>
        <v-card>
          <v-card-text>
            <LatestChanges />
          </v-card-text>
        </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
