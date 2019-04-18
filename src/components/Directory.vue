<template>
  <div class="q-ma-md">
    <div class="col-12 q-ma-sm"><q-input autofocus placeholder="Search directory" @input="updateFilter" v-model="search" /></div>
    <q-item v-for="minister in filteredMinisters" :key="minister.id">
      <q-item-section avatar>
        <img v-if="minister.image" class="q-mr-md" style="border-radius: 50%;" height="80px" :src="url + minister.image">
        <img v-else class="q-mr-md" height="80px" :src="blankpic">
      </q-item-section>
      <q-item-section middle>
        <q-item-label>{{minister.individual.title}} {{minister.individual.firstname}}  <b>{{minister.individual.surname}}</b></q-item-label>
        <q-item-label v-if="minister.circuit.circuit"><router-link class="text-primary" :to="'/circuits/' + minister.circuit.id">{{minister.circuit.circuit}}</router-link></q-item-label>
        <q-item-label v-else>{{minister.circuit.district}} Synod</q-item-label>
        <q-item-label v-if="$store.state.user && $store.state.user.person.status === 'minister'"><a class="text-grey" :href="'tel:' + minister.individual.cellphone">{{minister.individual.cellphone}}</a></q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      search: '',
      ministers: [],
      filteredMinisters: [],
      synod: {},
      url: '',
      blankpic: ''
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'Synod_Save_Directory'
      }
    },
    updateFilter () {
      if (this.search === '') {
        this.filteredMinisters = this.ministers
      } else {
        this.filteredMinisters = []
        for (var fndx in this.ministers) {
          if ((this.ministers[fndx].individual.surname.toLowerCase().includes(this.search.toLowerCase())) || (this.ministers[fndx].individual.firstname.toLowerCase().includes(this.search.toLowerCase()))) {
            this.filteredMinisters.push(this.ministers[fndx])
          }
        }
      }
    }
  },
  mounted () {
    this.search = ''
    this.$axios.post(process.env.API + '/districts/directory',
      {
        id: 7
      })
      .then(response => {
        this.url = process.env.WEB + '/vendor/bishopm/images/profile/'
        this.blankpic = process.env.WEB + '/vendor/bishopm/images/face.png'
        this.ministers = response.data.ministers
        this.filteredMinisters = this.ministers
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
