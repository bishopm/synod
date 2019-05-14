<template>
<div>
    <div class="row q-mt-lg">
      <div class="col-auto q-mx-lg">
        <q-btn size="sm" color="black" @click="down" icon="fa fa-caret-left"/>
      </div>
      <div class="col">
        <q-slider label label-always v-model="slide" :min="1" :max="this.$store.state.bluebook.length"/>
      </div>
      <div class="col-auto q-mx-lg">
        <q-btn size="sm" color="black" @click="up" icon="fa fa-caret-right"/>
      </div>
    </div>
    <div>
      <img :width="zoom + '%'" :src="slides[slide-1]" v-touch-swipe.mouse.left.right="handleSwipe">
      <q-page-sticky position="bottom-right" :offset="[64, 12]">
        <span class="text-grey text-bold q-mr-sm">{{zoom}}%</span>
        <q-btn @click="zoom = zoom + 20" round size="md" icon="fa fa-search-plus" color="primary" />
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[16, 12]">
        <q-btn @click="zoom = zoom - 20" round size="md" icon="fa fa-search-minus" color="primary" />
      </q-page-sticky>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 1,
      fullscreen: false,
      slides: [],
      zoom: 100
    }
  },
  methods: {
    down () {
      if (this.slide !== 1) {
        this.slide = this.slide - 1
      }
    },
    up () {
      if (this.slide !== this.$store.state.bluebook.length) {
        this.slide = this.slide + 1
      }
    },
    handleSwipe ({ evt, ...info }) {
      if ((info.direction === 'right') && (this.zoom === 100)) {
        this.slide = this.slide - 1
      } else if ((info.direction === 'left') && (this.zoom === 100)) {
        this.slide = this.slide + 1
      }
    }
  },
  mounted () {
    for (var bb in this.$store.state.bluebook) {
      this.slides.push(process.env.WEB + '/vendor/bishopm/images/bluebook/' + this.$store.state.bluebook[bb])
    }
  }
}
</script>

<style>
</style>
