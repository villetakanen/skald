<template>
  <div class="GameTrack">
    <h1>{{id}}</h1>
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
        Editing {{track}}
        <template v-for="(type, index) in track">
          <div
             style="display: inline-block"
             v-bind:key="index">
             <TrackTicker
               disabled
               :type="type"
               :index="index"
               :clock="clock"
              />
          </div>
        </template>
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
          @click="addStep(newType)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>

      <!-- Using -->
      <div v-if="!modeEdit">
        Using ({{clock}})
        <template v-for="(type, index) in track">
          <div
             style="display: inline-block"
             v-bind:key="index">
            <TrackTicker
               :type="type"
               :index="index"
               :clock="clock"
              />
          </div>
        </template>
        <v-btn
          x-small
          outlined
          @click="modeEdit=true"
        >{{$t('GameTrack.Edit')}}</v-btn>
      </div>
      <p>{{creator}}</p>
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
    types: ['box', 'circle'],
    newType: 'box',
    clock: 4
  }),
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
  background-color: RGBA(0,0,0,0.5);
  h1 {
    color: white;
  }
}
</style>
