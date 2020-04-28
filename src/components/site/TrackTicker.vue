<template>
  <div class="ticker">
    <div :class="type">
      <p>
        <template v-if="index < clock">X</template>
        <template v-if="!index < clock">.</template>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'type',
    'index',
    'clock'
  ]
}
</script>

<style lang="scss" scoped>
.ticker {
  display: inline-block;
  .circle {
    border-radius: 50%;
  }
  .box, .circle {
    background-color: RGBA(255,255,255,0.5);
    height: 22px;
    width: 22px;
    margin: 2px;
    text-align: center;
  }
}
</style>
