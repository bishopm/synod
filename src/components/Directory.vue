<template>
  <div class="q-ma-md">
    <div class="text-center caption" v-if="synod">{{synod.district}} {{synod.denomination.provincial}} Directory</div>
    <q-item v-for="minister in ministers" :key="minister.id">
      <q-item-section avatar>
        <img v-if="minister.image" class="q-mr-md" style="border-radius: 50%;" height="80px" :src="url + minister.image">
        <img v-else class="q-mr-md" height="80px" :src="blankpic">
      </q-item-section>
      <q-item-section top>
        <q-item-label>{{minister.individual.title}} {{minister.individual.firstname}}  <b>{{minister.individual.surname}}</b></q-item-label>
        <q-item-label v-if="minister.circuit.circuit"><router-link :to="'/circuits/' + minister.circuit.id">{{minister.circuit.circuit}}</router-link></q-item-label>
        <q-item-label v-else>{{minister.circuit.district}} Synod</q-item-label>
        <q-item-label v-if="$store.state.user && $store.state.user.person.status === 'minister'">{{minister.individual.cellphone}}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ministers: [],
      synod: {},
      url: '',
      blankpic: ''
    }
  },
  computed: {

  },
  mounted () {
    this.$axios.post(process.env.API + '/districts/directory',
      {
        id: 7
      })
      .then(response => {
        this.url = process.env.WEB + '/vendor/bishopm/images/profile/'
        this.blankpic = process.env.WEB + '/vendor/bishopm/images/face.png'
        this.ministers = response.data.ministers
        this.synod = response.data.district
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
.layout-padding {
  padding-top:0;
}
p {
  margin-bottom: 0;
}
h3 {
  line-height:0px;
}
a:active, a:link, a:visited {
  text-anchor: #f05849;
  text-decoration: none;
}
</style>
