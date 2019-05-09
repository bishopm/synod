<template>
  <div class="q-ma-md">
    <div class="q-ma-md">
      <img width="100%" src="statics/cover.png"/>
    </div>
    <p class="header q-my-lg text-center">{{welcome}}</p>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      welcome: '',
      district: {}
    }
  },
  mixins: [saveState],
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'Synod_Save_Home'
      }
    }
  },
  mounted () {
    this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
    this.$axios.get(process.env.API + '/districts/map/' + this.$store.state.district)
      .then((response) => {
        this.district = response.data.district
        this.$store.commit('setFeeds', response.data.feeds)
        this.welcome = 'Welcome to the ' + this.district.district + ' ' + this.district.denomination.provincial
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
