<template>
  <div class="q-ma-md" v-if="$store.state.user.user.id === 1">
    <p class="caption text-center">Site settings</p>
    <form>
      <q-select label="Church" placeholder="Select church" v-model="church" :options="churchOptions" map-options/>
      <q-select label="Synod" @input="chooseDistrict" placeholder="Select a synod" v-model="district" :options="districtOptions" map-options emit-value/>
    </form>
    <div class="text-center" v-if="society > 0">
      <q-btn class="q-my-md" color="secondary" @click.native="goHome()">All done! Back to home page</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      churchOptions: [{ label: 'Methodist Church of Southern Africa', value: 'mcsa' }],
      districtOptions: [],
      church: 'mcsa',
      token: this.$store.state.token,
      district: 7,
      phone: ''
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    setToken () {
      localStorage.setItem('SYNOD_Token', this.token)
    },
    populateDistricts () {
      this.$axios.get(process.env.API + '/districts')
        .then(response => {
          this.districtOptions = []
          for (var dkey in response.data) {
            var newitem = {
              label: response.data[dkey].district,
              value: response.data[dkey].id
            }
            this.districtOptions.push(newitem)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    chooseDistrict () {
      localStorage.setItem('SYNOD_District', this.district)
    }
  },
  async mounted () {
    this.populateDistricts()
    if (localStorage.getItem('SYNOD_District')) {
      this.district = parseInt(localStorage.getItem('SYNOD_District'))
      await this.chooseDistrict()
    }
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
</style>
