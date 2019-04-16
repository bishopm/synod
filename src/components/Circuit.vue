<template>
  <div v-if="circuit" class="layout-padding">
    <h5 class="text-center">
      {{circuit.circuitnumber}} {{circuit.circuit}}<br>
      <small><a target="_blank" :href="planurl">Current preaching plan</a></small>
    </h5>
    <div class="row">
      <div class="col-shrink col-xs-12 col-sm-12 col-md-6">
        <q-list>
          <q-item-label class="text-center" header>Societies</q-item-label>
          <q-item v-for="society in circuit.societies" :key="society.id" :to="'/societies/' + society.id">
            {{society.society}}
          </q-item>
        </q-list>
      </div>
      <div class="col col-xs-12 col-sm-12 col-md-6">
        <q-item-label class="text-center" v-if="circuit.ministers.length" header>Staff</q-item-label>
        <q-list>
          <q-item v-for="minister in circuit.ministers" :key="minister.id">
            {{minister.individual.title}} {{minister.individual.firstname}} {{minister.individual.surname}}
            <q-badge class="q-mx-xs" v-for="tag in minister.tags" :key="tag.id">{{tag.name}}</q-badge>
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
      perm: '',
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
    this.$axios.get(process.env.API + '/circuits/' + this.$route.params.id)
      .then((response) => {
        this.circuit = response.data.circuit
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
.q-item {
  min-height: 0px;
}
</style>
