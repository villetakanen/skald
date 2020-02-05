<template>
  <v-container>

    <v-row>
      <v-col>
        <TabTitle
          topic="Your Personal Settings and Profile"/>
      </v-col>
    </v-row>

    <v-row v-if="isAuthorsProfile()">
      <v-col md='4'>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form
                 submit.prevent="save">
                <v-text-field
                  label="Nickname"
                  v-model="nick"
                  ></v-text-field>
                <v-btn
                  color="primary"
                  small
                  @click="save">
                  Save</v-btn>
              </v-form>
            </v-container>
            <v-divider></v-divider>
            <v-switch
              v-model="vuetifyTheme"
              color="primary"
              label="Use Dark Theme"></v-switch>
            <v-divider></v-divider>
            <ForgetMeButton/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md='4'>
        <AuthorWorkLog/>
      </v-col>
      <v-col md='4'>
       <v-card>
          <v-card-text>
            These are the Sites you have been working on!
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!isAuthorsProfile()">
      <v-col>
        <h1>The profile page requires a logged in Author</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TabTitle from '../components/TabTitle'
import AuthorWorkLog from '../components/profile/AuthorWorkLog'
import ForgetMeButton from '../components/profile/ForgetMeButton'

export default {
  components: {
    TabTitle,
    AuthorWorkLog,
    ForgetMeButton
  },
  props: [
    'nickname'
  ],
  data: () => ({
    newNick: null
  }),
  computed: {
    pageLog () {
      return this.$store.getters['author/pageLog']()
    },
    vuetifyTheme: {
      get () {
        return this.$vuetify.theme.dark
      },
      set (value) {
        // The main.js will update author/theme accordingly every time
        // it is changed, so we do not need to do it here
        this.$store.dispatch('author/theme', value)
      }
    },
    nick: {
      get () {
        if (this.newNick !== null) return this.newNick
        return this.$store.getters['author/nick']()
      },
      set (nick) {
        this.newNick = nick
      }
    }
  },
  methods: {
    isAuthorsProfile () {
      return this.$store.getters['author/nick']() === this.nickname
    },
    save () {
      this.$store.dispatch('author/nick',
        this.newNick).then(() => {
        // this.nickname = this.newNick
        this.$router.push('/u/' + this.newNick)
      })
    }
  }
}
</script>
