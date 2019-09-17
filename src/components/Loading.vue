<template>
  <v-container>
    <img id="loader" alt="loading" src="../assets/logo.png"/>
  </v-container>
</template>
<style scoped>
#loader {
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
