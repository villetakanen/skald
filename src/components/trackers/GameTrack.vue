<template>
  <div class="GameTrack">
    <h2 style="padding-left: 8px;">{{id}}</h2>
    <v-btn
      v-if="!creator"
      x-small
      class="ma-2"
      color="secondary"
      @click="create"
    >{{$t('GameTrack.Create')}}</v-btn>
    <div
      v-if="creator"
    >
      <!-- Editing -->
      <div v-if="modeEdit">
        <div
          class="track"
          :style="`width: ${trackWidth}`">
          <template v-for="(type, index) in track">
            <div v-bind:key="index">
              <TrackTicker
                v-if="type ==='box' || type ==='circle'"
                :type="type"
                :index="index"
                :checked="! (clock < index + 1)"
              />
              <div
                class="trackseparator"
                v-if="type === 'line'">
                <p>//</p>
              </div>
            </div>
          </template>
        </div>
        <v-btn
          x-small
          outlined
          @click="modeEdit=false"
        >{{$t('GameTrack.EditingDone')}}</v-btn>
        <div style="display: inline-block; max-width: 70px">
          <v-select
            :items="types"
            label="Add"
            v-model="newType"
          ></v-select>
        </div>
        <v-btn
          icon
          color="secondary"
          @click="addStep(newType)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          icon
          color="secondary"
          @click="dropStep()">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </div>

      <!-- Using -->
      <div
        v-if="!modeEdit"
        style="position:relative"
      >
        <v-btn
          style="position:absolute;right:8px;top:-55px;"
          fab
          x-small
          color="primary"
          @click="modeEdit=true"
        ><v-icon>mdi-pencil</v-icon></v-btn>
        <div
          class="track"
          :style="`width: ${trackWidth}`">
          <template v-for="(type, index) in track">
            <div v-bind:key="index">
              <TrackTicker
                v-if="type ==='box' || type ==='circle'"
                :type="type"
                :index="index"
                :checked="! (clock < index + 1)"
                v-on:clicked="trackUpdate"
              />
              <div
                class="trackseparator"
                v-if="type === 'line'">
                <p>//</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TrackTicker from './TrackTicker'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  components: {
    TrackTicker
  },
  props: [
    'id',
    'site'
  ],
  data: () => ({
    track: null,
    creator: null,
    modeEdit: false,
    types: ['box', 'circle', 'line'],
    newType: 'box',
    clock: 0
  }),
  computed: {
    trackWidth () {
      if (!this.track) return '1em'
      const width = (this.track.length * 30 + 4)
      return width + 'px'
    }
  },
  methods: {
    /**
     * Create a new Track in the Site
     */
    create () {
      const db = firebase.firestore()
      const trackRef = db.collection('sites').doc(this.site).collection('GameTracks').doc(this.id)
      const author = this.$store.getters['author/uid']()
      trackRef.set({ creator: author }).then((event) => {
        this.subscribe()
      }).catch((error) => {
        this.$store.commit('error', error, { root: true })
      })
    },
    subscribe () {
      const db = firebase.firestore()
      const trackRef = db.collection('sites').doc(this.site).collection('GameTracks').doc(this.id)
      trackRef.onSnapshot((doc) => {
        const data = doc.data()
        this.track = data.track
        this.clock = data.clock ? data.clock : 0
        this.creator = data.creator
        /* var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ", doc.data()); */
      })
    },
    addStep (type) {
      const db = firebase.firestore()
      const trackRef = db.collection('sites').doc(this.site).collection('GameTracks').doc(this.id)
      const nTrack = this.track ? this.track : []
      nTrack.push(type)
      trackRef.update({ track: nTrack })
    },
    dropStep () {
      const db = firebase.firestore()
      const trackRef = db.collection('sites').doc(this.site).collection('GameTracks').doc(this.id)
      const nTrack = this.track
      nTrack.pop()
      trackRef.update({ track: nTrack })
    },
    trackUpdate (event) {
      if (this.clock === event + 1) this.clock = event
      else this.clock = event + 1
    }
  },
  created () {
    this.subscribe()
  }
}

</script>

<style lang="scss" scoped>
.GameTrack {
  width: 100%;
  border: solid 2px black;
  h1 {
    color: white;
  }
}
.track {
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 2px;
  margin: 4px;
  position: relative;
  .trackseparator {
    text-align: center;
    width: 30px;
    color: black;
    position: relative;
    p {
      position: absolute;
      margin: 0;
      padding: 0;
      left: 10px;
      top: 3px;
      line-height: 22px;
    }
  }
}
</style>
