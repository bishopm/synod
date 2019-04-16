<template>
  <div v-if="circuits" class="q-ma-md">
    <q-list striped>
      <q-item-label header class="text-center">Circuits</q-item-label>
      <q-item v-for="circuit in circuits" :key="circuit.id" :to="'/circuits/' + circuit.id">
        {{circuit.circuitnumber}} {{circuit.circuit}}
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      circuits: []
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
.q-item {
  min-height: 0px;
}
</style>
