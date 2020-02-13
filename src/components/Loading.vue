<template>
  <img :class="'loader'+styles" alt="loading" src="../assets/logo.png"/>
</template>

<script>
export default {
  props: [
    'inline'
  ],
  computed: {
    styles () {
      if (typeof this.inline !== 'undefined') return ' inline'
      return ''
    }
  }
}
</script>

<style scoped>
.inline {
  height: 2em;
  margin: -0.5em;
}
.loader {
    max-width: 128px;
    -webkit-animation: pulse 3s infinite ease-in-out;
    -o-animation: pulse 3s infinite ease-in-out;
    -ms-animation: pulse 3s infinite ease-in-out;
    -moz-animation: pulse 3s infinite ease-in-out;
    animation: pulse 3s infinite ease-in-out;
}

@-webkit-keyframes pulse {
    0% {  opacity: 0.3; }
    50% {  opacity: 1; }
    100% { opacity: 0.3; }
}

@keyframes pulse {
    0% {  opacity: 0.3; }
    50% {  opacity: 1; }
    100% { opacity: 0.3; }
}
</style>
