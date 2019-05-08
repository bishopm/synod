<template>
  <div>
    <leafletmap v-if="society.location" :latitude="society.location.latitude" :longitude="society.location.longitude" :popuplabel="society.society + ' Methodist Church'" editable="no"></leafletmap>
    <div v-if="society" class="text-center layout-padding">
      <h4>
        {{society.society}}
      </h4>
      <p v-for="service in society.services" :key="service.id">
        {{service.servicetime}} ({{service.language}})
      </p><br>
      <p v-if="noservices">No services have been added yet</p>
      <div v-if="society.location && society.location.address"><q-icon name="fa fa-fw fa-map-marked-alt" class="text-red q-mr-md"></q-icon>{{society.location.address}}</div>
      <div v-if="society.location && society.location.phone"><q-icon name="fa fa-fw fa-phone" class="text-red q-mr-md"></q-icon>{{society.location.phone}}</div>
      <div v-if="society.website"><q-icon name="fa fa-fw fa-globe" class="text-red q-mr-md"></q-icon><a class="text-red" target="_blank" :href="society.website">{{society.website}}</a></div>
    </div>
  </div>
</template>

<script>
import leafletmap from './Leafletmap'
export default {
  data () {
    return {
      society: {},
      noservices: false
    }
  },
  components: {
    'leafletmap': leafletmap
  },
  async mounted () {
    this.$axios.get(process.env.API + '/societies/' + this.$route.params.id)
      .then((response) => {
        this.society = response.data
        this.longitude = this.society.location.longitude
        this.latitude = this.society.location.latitude
        if (!this.society.services.length) {
          this.noservices = true
        }
        this.perm = this.$store.state.user.societies[this.society.id]
        if (this.society.website) {
          if (!this.society.website.includes('http')) {
            this.society.website = 'http://' + this.society.website
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
h4 {
  margin-block-start: 0.3em;
  margin-block-end: 0.3em;
}
</style>
