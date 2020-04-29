<template>
  <div class="PointCounter">
    <div class="CounterTitle">
      {{name}}
    </div>
    <v-btn
      class="add"
      icon><v-icon>mdi-plus</v-icon></v-btn>
    <div class="values">
      <div class="current">
        {{currentValue}}
      </div>
      <div class="max">
        {{max}}
      </div>
    </div>
    <v-btn
      class="reduce"
      icon><v-icon>mdi-minus</v-icon></v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: -1 })
  max!: Number

  @Prop({ default: -1 })
  current!: Number

  currentValue!: Number

  @Prop({ required: true })
  name!: String

  created () {
    // If current is not set, and max is set, make currentValue = max
    this.currentValue = this.max > -1 && this.current === -1 ? this.max : this.current
  }
}
</script>

<style lang="scss" scoped>
.PointCounter {
  display: block;
  margin: 4px;
  padding: 8px;
  background-color: RGBA(0, 0, 0, 0.5);
  position: relative;
  height: 92px;
  width: 214px;
  .CounterTitle {
    position: absolute;
    font-size: 12px;
    top: 8px;
    left: 8px;
  }
  .add{
    position: absolute;
    top: 36px;
    left: 8px;
  }
  .reduce{
    position: absolute;
    top: 36px;
    left: 168px;
  }
  .values{
    background-color: black;
    position: absolute;
    top: 28px;
    left: 50px;
    display: flex;
    width: 108px;
    height: 54px;
    flex-flow: row;
    align-items: stretch;
    padding: 1px;
    div{
      background-color: RGBA(255, 255, 255, 0.9);
      border: solid 2px black;
      flex-grow: 1;
      margin: 1px;
      color: black;
      font-size: 28px;
      font-weight: bold;
      line-height: 52px;
      padding: 0;
      text-align: center;
    }
    div.current{
      color: #345;
    }
  }
}
</style>
