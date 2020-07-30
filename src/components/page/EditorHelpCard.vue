<template>
  <v-card
    outlined
    class="EditorHelpCard">
    <v-card-title>{{$t('syntax_help_title')}}</v-card-title>
    <v-card-text>
      <h1>MarkDown</h1>
      <p># {{$t('syntax_help_h1')}}</p>
      <p>## {{$t('syntax_help_h3')}}</p>
      <p>### {{$t('syntax_help_h3')}}</p>
      <p>#### {{$t('syntax_help_h4')}}</p>
      <h3>Styling</h3>
      <p>_{{$t('syntax_help_italic')}}_</p>
      <p>*{{$t('syntax_help_bold')}}*</p>
      <p>- {{$t('syntax_help_list')}}</p>
      <h1>Extended Markup</h1>
      <h3>Links</h3>
      <p>[wiki:link] {{$t('syntax_help_wikilink')}}</p>
      <p>[wiki:link title] {{$t('syntax_help_wikilink_title')}}</p>
      <h3>Tables</h3>
      <pre>|
|!head      |cell      |cell        |
|aling left | centered | align right|</pre>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.EditorHelpCard {
  h1{
    color: white;
    font-size: 18px;
    font-weight: 500;
    border-bottom: solid 1px #eee;
    margin-bottom: 8px;
    line-height: 22px;
    background-color: RGBA(255, 255, 255, 0.1);
  }
  pre{
    display: block;
    color: white;
    background-color: RGBA(5, 5, 5, 0.22);
    border-radius: 4px;
    border: solid 1px RGBA(255, 255, 255, 0.1);
    margin: 0px;
    padding: 4px;
    overflow: hidden;
  }
}
</style>
