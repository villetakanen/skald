<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>All sites</h1>
      </v-col>
      <v-col>
        <CreateSiteButton/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <SiteList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateSiteButton from '../components/CreateSiteButton'
import SiteList from '../components/SiteList'

export default {
  components: {
    SiteList,
    CreateSiteButton
  }
}
</script>
