<template>
    <v-container
    fluid
    grid-list-md>
    <v-layout wrap>
    <template v-for="(site, index) in sites">
      <v-flex xs6 md3 v-bind:key="index">
        <v-card
          >
          <v-img
            v-if="sitePoster(index) !== null"
            style="background-color: black;"
            class="white--text"
            height="128px"
            :src="sitePoster(index)">
            <v-card-title :class="site.titleColorClass"><router-link :to="`/v/${index}`">{{site.name}}</router-link>
          </v-card-title></v-img>
          <v-img
            v-if="sitePoster(index) === null"
            class="white--text"
            height="128px"
            src="../assets/skald-poster.svg">
            <v-card-title><router-link :to="`/v/${index}`">{{site.name}}</router-link>
          </v-card-title></v-img>
          <v-card-text>
            {{site.description}}
          </v-card-text>
        </v-card>
      </v-flex>
    </template>
    </v-layout>
    </v-container>
</template>
<script>
export default {
  props: [
    'count'
  ],
  computed: {
    sites () {
      const list = this.$store.getters['sites/list']()
      const count = parseInt(this.count)

      var i = 0
      var rlist = {}
      for (var key in list) {
        if (list[key].hidden && typeof list[key].hidden !== 'undefined' && list[key].hidden !== null) continue
        rlist[key] = list[key]
        i++
        if (i >= count) break
      }

      return rlist
    }
  },
  methods: {
    sitePoster (site) {
      return this.$store.getters['sites/sitePosterURL'](site)
      // if (site === 'nighthawk') return 'https://lh3.googleusercontent.com/MhDNgPvNhBKjmGDO4moOIvAcztDGIGO7mlwEk516tOMwwVHdq4uzINWc5ZQTEQS1ZA6JElXVDHEiXp_AYcbBeLeVzNkFDb3lmsK-jO-qUDEtbXbDQyMwl5Sg0C2Lw_PtrfWH3rUhRLjWHyNr0j_cYlfkt3jvgOkaya_DFqB1qoZotPVC_E0dvYOco0j8bRkOlsSgB0vkdjZveOW8jAsS1Ff4KEnm7atlNari84KhjLeOLlCkokbSOQ4hDh3oOAsed0AVEJzDWaoqezMS81OH7jaUhQWD33AcYFtBiVB1C_dhhI4E5uHdW_6drwdd04RnTLv2n9eI_S6AdK52wkPD3GWKXG741bWTni2JHNnGr8f-jwrkJ6_eNTpboccXUiPSDUhyFIvngfsTnx6mwAe9wdhCxBHTGyRVzyaWL2DAMyQoiw7IGasj_-0k4m6s3cPSsgoiAeaVUg5P77D3pdIG2C2rp0IPkt5zMpzzdbFvJUsUfePLkuI6BGTZAMEvGlueoxMhTGQZuO0sv1j8_Hw3Aa0ioWM9cffgsq2r2deyJ4XwYKspc_izwcNu00o_UwRst7dDVSgXpuBv_SYaTrLJGfXQI0MCvTFlpV-Y9D80PopFoXGZCdpcRn9-Gr5ChdqCjJkM_VF6Cd7ZvJVxmGjLThhVGmOBUnJyX3bhi6OuDPvjpG05SKd3Q8dMbjZVo7IGRmdFvdyJudTO8iCew0X29WX9gGj6VSrvgxoYPrx9QNQIJad_PQ=w1213-h630-no'
      // return null
    }
  }
}
</script>
