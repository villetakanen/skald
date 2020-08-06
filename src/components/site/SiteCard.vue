<template>
  <v-card
    :class="theme"
    :to="'/v/'+siteid">
    <div class="sitecard-theme-poster"></div>
    <div v-if="poster"
      class="sitecard-poster"
      :style="`background-image: url(${poster})`"></div>
    <div class="sitecard-theme-poster-blur"></div>
    <div class="sitecard">
      <div>
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>
          <p>{{description}}</p>
        </v-card-text>
      </div>
      <v-avatar
        class="ma-2 avatar"
        size="92">
        <v-img :src='poster'/>
      </v-avatar>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCompositionApi, { defineComponent, onMounted, ref } from '@vue/composition-api'
import { fireStoreURL } from '../../plugins/skaldfire'
// fireStoreURL(props.posterURL)
Vue.use(VueCompositionApi)

export default defineComponent({
  props: {
    title: {
      type: [String],
      required: true
    },
    description: {
      type: [String],
      required: false
    },
    posterURL: {
      type: [String],
      required: false
    },
    siteid: {
      type: [String],
      required: true
    },
    theme: {
      type: [String],
      required: false
    }
  },
  setup (props) {
    console.log(props)
    const poster = ref('')
    onMounted(() => {
      if (typeof props.posterURL === 'string') {
        fireStoreURL(props.siteid + '/' + props.posterURL).then((url) => {
          console.log(url)
          if (typeof url === 'string') poster.value = url
        })
      }
    })
    return { poster }
  }
})

</script>

<style lang="scss" scoped>
.sitecard {
  position: relative;
  padding-right: 92px;
  height: 114px;
  .avatar {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.sitecard-poster{
  height: 114px;
  width: 75%;
  position: absolute;
  top:0;
  right:0;
  background-size: cover;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
