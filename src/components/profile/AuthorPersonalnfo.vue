<template>
  <v-card class="mb-4">
    <v-card-title>About me</v-card-title>
    <v-card-text>
      <!--p>Local profile data</p>
      <img :src="photoURL" alt="Local Profile picture" class="picture_thumbnail"/>
      <v-btn @click="removeLocalPhoto" text>Delete</v-btn>
      <v-divider></v-divider-->
      <p>SSO User data</p>
      <img :src="ssoPhotoURL" alt="SSO Profile picture" class="picture_thumbnail"/>
      <!--v-btn @click="copyPhotoURLFromSSO" text>Use here</v-btn-->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    ssoPhotoURL () {
      // xif (!this.$store.author) return null
      // console.log(this.$store.getters['author/ssoUser']())
      // console.log(this.$store.getters['author/photoURL']())
      return this.$store.getters['author/ssoPhotoURL']()
    },
    photoURL () {
      // xif (!this.$store.author) return null
      // console.log(this.$store.getters['author/ssoUser']())
      // console.log(this.$store.getters['author/photoURL']())
      return this.$store.getters['author/photoURL']()
    }
  }

}
</script>

<style lang="scss" scoped>
.picture_thumbnail {
  max-width: 72px;
  border: solid 1px black;
  margin: 4px;
  border-radius: 50%;
}
</style>
