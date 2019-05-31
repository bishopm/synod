<template>
  <div>
    <leafletmap :latitude="society.latitude" :longitude="society.longitude" editable="yes"></leafletmap>
    <div v-if="society" class="text-center q-ma-md">
      <h4>Add a society</h4>
      <q-input outlined class="q-ma-md" label="Society name" v-model="society.name"/>
      <q-input outlined class="q-ma-md" label="Latitude" v-model="society.latitude"/>
      <q-input outlined class="q-ma-md" label="Longitude" v-model="society.longitude"/>
    </div>
  </div>
</template>

<script>
import leafletmap from './Leafletmap'
export default {
  data () {
    return {
      society: {
        name: '',
        latitude: 0,
        longitude: 0,
        circuit_id: parseInt(this.$route.params.id)
      },
      noservices: false
    }
  },
  components: {
    'leafletmap': leafletmap
  }
}
</script>

<style>
h4 {
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
}
</style>
