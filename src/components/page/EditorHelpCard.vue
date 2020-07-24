<template>
  <v-card
    outlined>
    <v-card-title>{{$t('syntax_help_title')}}</v-card-title>
    <v-card-text>
      <p># {{$t('syntax_help_h1')}}</p>
      <p>## {{$t('syntax_help_h3')}}</p>
      <p>### {{$t('syntax_help_h3')}}</p>
      <p>#### {{$t('syntax_help_h4')}}</p>
      <h3>Links</h3>
      <p>[wiki:link] {{$t('syntax_help_wikilink')}}</p>
      <p>[wiki:link title] {{$t('syntax_help_wikilink_title')}}</p>
      <h3>Styling</h3>
      <p>_{{$t('syntax_help_italic')}}_</p>
      <p>*{{$t('syntax_help_bold')}}*</p>
      <p>- {{$t('syntax_help_list')}}</p>
    </v-card-text>
  </v-card>
</template>
