<template>
  <div v-if="circuits" class="q-ma-md">
    <leafletclustermap class="q-mb-lg" v-if="showmap" :rawbounds="bounds" :markers="markers"></leafletclustermap>
    <div class="text-center header q-ma-md" v-else>Loading Synod map ...</div>
    <br><br>
    <q-list striped>
      <q-item-label header class="text-center">Circuits</q-item-label>
      <q-item class="compact" v-for="circuit in circuits" :key="circuit.id" :to="'/circuits/' + circuit.id">
        {{circuit.circuitnumber}} {{circuit.circuit}}
      </q-item>
    </q-list>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
import leafletclustermap from './LeafletClustermap'
export default {
  data () {
    return {
      circuits: [],
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
        'cacheKey': 'Synod_Save_Circuits'
      }
    }
  },
  mounted () {
    this.$axios.get(process.env.API + '/districts/map/' + this.$store.state.district)
      .then((response) => {
        this.district = response.data.district
        this.circuits = response.data.circuits
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
.compact {
  min-height: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
}
</style>
