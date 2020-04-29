<template>
  <div
    :class="type"
    @click="clicked">
      <template v-if="checked">
        <div class="checked"></div>
      </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true })
  public type!: String

  @Prop({ required: true })
  public index!: Number

  @Prop({ required: true })
  public checked!: Boolean

  @Emit()
  clicked () {
    return this.index
  }
}
</script>

<style lang="scss" scoped>

.circle {
  border-radius: 50%;
  .checked {
    border-radius: 50%;
  }
}
.box, .circle {
  margin: 2px;
  position: relative;
  background-color: white;
  border: solid 2px black;
  height: 26px;
  width: 26px;
  .checked {
    display: block;
    background-color:#555;
    width: 18px;
    height: 18px;
    top: 2px;
    left: 2px;
    position: absolute;
  }
}

</style>
