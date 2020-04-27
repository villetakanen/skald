<template>
  <div>
    <v-subheader>{{$t('set_lang_subheader')}}</v-subheader>
    <!--v-list-item>
    <v-list-item-title-->
    <v-btn
      text
      color = "primary"
      @click="lang = 'en'"
      :disabled="lang === 'en'"
      >{{$t('set_lang_en')}}</v-btn>
    <v-btn
      text
      color = "primary"
      @click="lang = 'fi'"
      :disabled="lang === 'fi'"
      >{{$t('set_lang_fi')}}</v-btn>
    <!--/v-list-item-title>
  </v-list-item-->
  </div>
</template>

<script>
export default {
  computed: {
    lang: {
      get () {
        return this.$i18n.locale
      },
      set (locale) {
        this.$i18n.locale = locale
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item__title{
  text-align: center;
  width: 100%;
}
</style>
