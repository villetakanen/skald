<template>
  <v-container>

    <v-row>
      <v-col>
        <TabTitle
          topic="Attachments"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        md='6'
        cols='12'>
        <SiteImagesListingCard
          :siteid="siteid"/>
      </v-col>
      <v-col
        md='6'
        cols='12'>
        <SiteUploadsListingCard
          :siteid="siteid"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabTitle from '../components/TabTitle'
import SiteUploadsListingCard from '../components/site/SiteUploadsListingCard'
import SiteImagesListingCard from '../components/site/SiteImagesListingCard'

export default {
  components: {
    TabTitle,
    SiteUploadsListingCard,
    SiteImagesListingCard
  },
  props: [
    'siteid'
  ]
}
</script>

<style lang="scss" scoped>
div.attachment{
  margin: 0;
  padding: 8px;
  line-height: 28px;
  font-size: 16px;
  position: relative;
  p{
    margin: 0;
    padding: 0;
    margin-left: 44px;
  }
  div.actions{
    position: absolute;
    right: 16px;
    top: 8px;
  }
  div.preview{
    position: absolute;
    left: 6px;
    top: 6px;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    background-color: rgba(#039be5, 0.7);
    text-align: center;
    img{
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
      align-self: center;
    }
  }
  a {
    text-decoration: none;
  }
}
div.attachment:hover{
  background-color: rgba(0, 0, 0, 0.5)
}
div.attachment + div.attachment {
  border-top: solid 1px #666;
}
</style>
