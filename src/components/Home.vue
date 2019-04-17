<template>
  <div class="q-ma-md">
    <p class="header q-mb-md text-center">{{welcome}}</p>
    <leafletclustermap v-if="showmap" :rawbounds="bounds" :markers="markers"></leafletclustermap>
    <div class="text-center header q-ma-md" v-else>Loading Synod map ...</div>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
import leafletclustermap from './LeafletClustermap'
export default {
  data () {
    return {
      welcome: '',
      district: {},
      markers: [],
      bounds: [],
      showmap: false
    }
  },
  components: {
    'leafletclustermap': leafletclustermap
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'Synod_Save_Home'
      }
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/districts/' + this.$store.state.district)
      .then((response) => {
        this.district = response.data.district
        this.markers = response.data.markers
        this.showmap = true
        this.bounds = response.data.bounds
        this.welcome = 'Welcome to the ' + this.district.district + ' ' + this.district.denomination.provincial
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
