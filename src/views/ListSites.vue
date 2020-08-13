<template>
  <v-container>

    <v-row>
      <v-col cols="9">
        <TabTitle
          topic="Sites"/>
      </v-col>
      <v-col cols="3" align="right">
        <CreateSiteButton/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <SiteList
          :cols="4"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateSiteButton from '../components/CreateSiteButton'
import SiteList from '../components/SiteList'
import TabTitle from '../components/TabTitle'

export default {
  components: {
    SiteList,
    CreateSiteButton,
    TabTitle
  }
}
</script>
