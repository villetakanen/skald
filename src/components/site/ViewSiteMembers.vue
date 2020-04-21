<template>
  <div class="member-list">
    <template v-for="(member, index) in members">
      <div
        :style="'border: 3px solid RGBA(170, 180,190,0.5); color: ' + buttonColor(member.nick)"
        class="member-medal"
        v-bind:key="index">
        <img
          v-if="member.photoURL"
          :src="member.photoURL"
          alt="Local Profile picture"/>
        <div
          v-if="!photoURL"
          class="nophoto"><p>{{member.nick.substring(0,1)}}</p></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    members () {
      return this.$store.getters['site/members']()
    },
    photoURL () {
      return false
    }
  },
  methods: {
    buttonColor (nick) {
      if (!nick) return 'black'
      let hash = 0
      for (let i = 0; i < nick.length; i++) {
        hash = nick.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
      }
      const rgb = [0, 0, 0]
      for (let i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255
        rgb[i] = value
      }
      return `rgba(${rgb[2]}, ${rgb[0]}, ${rgb[1]}, 0.5)`
    }
  }
}
</script>

<style lang="scss" scoped>
.member-list {
  padding: 8px;
  text-align: right;
  .member-medal{
    display: inline-block;
    margin-left: -8px;
    height: 42px;
    width: 42px;
    border-radius: 50%;
    // background-color: red;
    p {
      line-height: 36px;
      margin: 0;
      padding: 0;
      width: 36px;
      text-align: center;
      font-weight: 800;
    }
    box-shadow: 0px 0px 14px RGBA(255,255,255,0.5);
  }
}
</style>
