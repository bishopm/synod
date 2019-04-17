<template>
  <div class="q-ma-md">
    <div class="header text-center">{{$route.params.year}} Synod <small class="text-grey">{{synod.circuit.circuit}}</small></div>
    <br>Documents | Agenda | Resolutions
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      items: [],
      synod: {}
    }
  },
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'Synod_Save_Synod'
      }
    }
  },
  mixins: [saveState],
  mounted () {
    this.$axios.post(process.env.API + '/synods',
      {
        district: this.$store.state.district,
        synodyear: this.$route.params.year
      })
      .then(response => {
        this.synod = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
