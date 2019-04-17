<template>
  <div v-if="circuit" class="layout-padding">
    <h5 class="text-center text-grey">
      {{circuit.circuitnumber}} {{circuit.circuit}}<br>
      <small><a class="text-primary" target="_blank" :href="planurl">Current preaching plan</a></small>
    </h5>
    <div class="row">
      <div class="col-shrink col-xs-12 col-sm-12 col-md-6">
        <q-list class="text-center  ">
          <q-item-label class="text-center" header>Societies</q-item-label>
          <q-badge class="q-pa-xs q-ma-xs" v-for="society in circuit.societies" :key="society.id">
            <router-link class="text-white" :to="'/societies/' + society.id">{{society.society}}</router-link>
          </q-badge>
        </q-list>
      </div>
      <div class="col col-xs-12 col-sm-12 col-md-6">
        <q-item-label class="text-center" v-if="circuit.ministers.length" header>Staff</q-item-label>
        <q-list>
          <q-item class="compact" v-for="minister in ministers" :key="minister">
            {{minister}}
          </q-item>
        </q-list>
        <leafletclustermap class="q-mt-md" v-if="showmap" :rawbounds="bounds" :markers="markers"></leafletclustermap>
      </div>
    </div>
  </div>
</template>

<script>
import leafletclustermap from './LeafletClustermap'
export default {
  data () {
    return {
      circuit: {},
      ministers: [],
      markers: [],
      bounds: [],
      showmap: false,
      planurl: ''
    }
  },
  components: {
    'leafletclustermap': leafletclustermap
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/circuits/map/' + this.$route.params.id)
      .then((response) => {
        this.circuit = response.data.circuit
        this.ministers = response.data.ministers
        this.planurl = process.env.WEB + '/plan/' + this.circuit.slug
        this.markers = response.data.markers
        this.showmap = true
        this.bounds = response.data.bounds
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
  margin-bottom: 6px;
}
h5 {
  margin-block-start: 5px;
  margin-block-end: 0px;
}
</style>
