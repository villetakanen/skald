<template>
  <v-container class="align-right">
    <v-btn
      small
      text
      @click="forgetMeDialog=true"
      >Forget Me</v-btn>
    <v-dialog
      v-model="forgetMeDialog"
      max-width="800">
      <v-card>
        <v-card-title>Forget Me?</v-card-title>
        <v-card-text>
          <WikiText :content="forgetMeInfo" siteid="skald"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          I am OK, with above
          <v-checkbox
            class="mx-1"
            v-model="confirm"
            ></v-checkbox>
          <v-btn
            class="mx-1"
            @click="forgetMeDialog=false"
            outlined
            :disabled="!confirm"
            color="primary">Yes, please destroy my profile permanently</v-btn>
          <v-btn
            class="mx-1"
            @click="forgetMeDialog=false"
            color="primary">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import WikiText from '../WikiText'

export default {
  components: {
    WikiText
  },
  data: () => ({
    forgetMeDialog: false,
    confirm: false
  }),
  computed: {
    forgetMeInfo () {
      if (this.$store.getters['metaBinder/page']('forget-me-info-box') === null) return ''
      return this.$store.getters['metaBinder/page']('forget-me-info-box').content
    }
  }
}
</script>

<style scoped>
.align-right{
  text-align: right
}
</style>
