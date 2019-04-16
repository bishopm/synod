<template>
  <div v-if="district" class="q-ma-md">
    <div class="header text-center q-ma-md text-bold">Synod office</div>
    <leafletmap v-if="district.location" :latitude="district.location.latitude" :longitude="district.location.longitude" :popuplabel="district.district + ' ' + district.denomination.provincial + ' Office'" editable="no"></leafletmap>
    <p class="q-mt-md">Address: {{district.address}}</p>
    <p class="q-mb-md">Phone: {{district.phone}}</p>
    <q-list>
      <q-item v-for="person in district.people" :key="person.id">
        <q-item-section avatar>
          <img v-if="person.individual.image" class="q-mr-md" style="border-radius: 50%;" height="100px" :src="url + person.individual.image">
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
import leafletmap from './Leafletmap'
export default {
  data () {
    return {
      district: {},
      blankpic: ''
    }
  },
  components: {
    'leafletmap': leafletmap
  },
  mounted () {
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
