<template>
  <v-card class="mb-4">
    <v-card-title>About me</v-card-title>
    <v-card-text>
      <p>Local profile data</p>
      <img v-if="photoURL" :src="photoURL" alt="Local Profile picture" class="picture_thumbnail"/>
      <div
        v-if="!photoURL"
        :style = "`background-color: ${buttonColor}`"
        class="nophoto">{{nick}}</div>
      <v-btn @click="removeLocalPhoto">Delete</v-btn>
      <v-divider></v-divider>
      <p>SSO User data</p>
      <img :src="ssoPhotoURL" alt="SSO Profile picture" class="picture_thumbnail"/>
      <v-btn @click="copyPhotoURLFromSSO">Use here</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    ssoPhotoURL () {
      return this.$store.getters['author/ssoPhotoURL']()
    },
    photoURL () {
      return this.$store.getters['author/photoURL']()
    },
    nick () {
      return this.$store.getters['author/nick']().substring(0, 1)
    },
    buttonColor () {
      const nick = this.$store.getters['author/nick']()
      if (!nick) return 'black'
      let hash = 0
      for (let i = 0; i < nick.length; i++) {
        hash = nick.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
      }
      const rgb = [0, 0, 0]
      for (let i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255
        rgb[i] = value
      }
      return `rgba(${rgb[2]}, ${rgb[0]}, ${rgb[1]}, 0.5)`
    }
  },
  methods: {
    copyPhotoURLFromSSO () {
      this.$store.dispatch('author/savePhotoURL', this.ssoPhotoURL)
    },
    removeLocalPhoto () {
      this.$store.dispatch('author/removePhotoURL')
    }
  }

}
</script>

<style lang="scss" scoped>
.picture_thumbnail {
  width: 72px;
  height: 72px;
  border: solid 1px black;
  margin: 4px;
  border-radius: 50%;
}
.nophoto {
  display: inline-block;
  width: 72px;
  height: 72px;
  border: solid 1px black;
  margin: 4px;
  border-radius: 50%;
  font-size: 32px;
  text-align: center;
  line-height: 68px;
}
</style>
