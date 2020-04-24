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
        <v-card class="my-4">
          <v-card-text>
            <h1>All SSO data</h1>
              <template v-for="(object, index) in ssodata">
                <p v-bind:key="index">{{index}}: {{object}}</p>
              </template>
            <h1>All Profile data</h1>
            <template v-for="(object, index) in profiledata">
                <p v-bind:key="index">{{index}}: {{object}}</p>
              </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md='4'>
        <AuthorWorkLog/>
      </v-col>
      <v-col md='4'>
        <AuthorPersonalInfo/>
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
import AuthorPersonalInfo from '../components/profile/AuthorPersonalnfo'

export default {
  components: {
    TabTitle,
    AuthorWorkLog,
    ForgetMeButton,
    AuthorPersonalInfo
  },
  props: [
    'nickname'
  ],
  data: () => ({
    newNick: null
  }),
  computed: {
    ssodata () {
      return JSON.parse(stringify(this.$store.getters['author/ssoUser']()))
    },
    profiledata () {
      return this.$store.getters['author/profile']()
    },
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
function stringify (obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer (replacer, cycleReplacer) {
  const stack = []
  const keys = []

  if (cycleReplacer == null) {
    cycleReplacer = function (key, value) {
      if (stack[0] === value) return '[Circular ~]'
      return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']'
    }
  }

  return function (key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    } else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}
</script>
