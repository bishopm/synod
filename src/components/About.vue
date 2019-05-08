<template>
  <div v-if="district" class="q-ma-md">
    <div v-if="district.location" class="header text-center q-ma-md text-bold">Synod office</div>
    <leafletmap :latitude="district.location.latitude" :longitude="district.location.longitude" :popuplabel="district.district + ' ' + district.denomination.provincial + ' Office'" editable="no"></leafletmap>
    <p class="q-mt-md">
      <q-icon name="fa fa-fw fa-map-marked-alt" class="text-red q-mr-md"></q-icon>Address: {{district.location.address}}<br>
      <q-icon name="fa fa-fw fa-phone" class="text-red q-mr-md"></q-icon>Phone: {{district.location.phone}}
    </p>
    <q-list>
      <q-item v-for="person in district.people" :key="person.id">
        <q-item-section avatar>
          <img v-if="person.individual.image && url" class="q-mr-md" style="border-radius: 50%;" height="100px" :src="url + person.individual.image">
          <img v-else class="q-mr-md" height="100px" :src="blankpic">
        </q-item-section>
        <q-item-section>
          <div class="text-center header">
            <span class="q-mx-md text-bold" v-for="tag in person.tags" :key="tag.id">{{tag.name}}</span><br>
            {{person.individual.title}} {{person.individual.firstname}} {{person.individual.surname}}
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
import leafletmap from './Leafletmap'
export default {
  data () {
    return {
      district: {},
      blankpic: '',
      url: ''
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'Synod_Save_Office'
      }
    }
  },
  components: {
    'leafletmap': leafletmap
  },
  mounted () {
    this.url = process.env.WEB + '/vendor/bishopm/images/profile/'
    this.$axios.get(process.env.API + '/districts/' + this.$store.state.district + '/details')
      .then((response) => {
        this.blankpic = process.env.WEB + '/vendor/bishopm/images/face.png'
        this.district = response.data
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
