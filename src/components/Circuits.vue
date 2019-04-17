<template>
  <div v-if="circuits" class="q-ma-md">
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
export default {
  data () {
    return {
      circuits: []
    }
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
    this.$axios.get(process.env.API + '/districts/' + this.$store.state.district)
      .then((response) => {
        this.circuits = response.data.circuits
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
