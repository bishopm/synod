<template>
<div>
    <div class="row q-mt-md">
      <div class="col-auto q-mx-lg">
        <q-btn size="sm" color="red" @click="down" icon="fa fa-caret-left"/>
      </div>
      <div class="col">
        <q-slider label label-always v-model="slide" :min="1" :max="262"/>
      </div>
      <div class="col-auto q-mx-lg">
        <q-btn size="sm" color="red" @click="up" icon="fa fa-caret-right"/>
      </div>
    </div>
    <div>
      <img :width="zoom + '%'" :src="slides[slide+1]" v-touch-swipe.mouse.left.right="handleSwipe">
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
      if (this.slide !== 262) {
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
    var itxt = ''
    for (var i = 1; i < 263; i = i + 1) {
      if (i < 10) {
        itxt = process.env.WEB + '/vendor/bishopm/images/bluebook/00' + i + '.jpg'
      } else if (i < 100) {
        itxt = process.env.WEB + '/vendor/bishopm/images/bluebook/0' + i + '.jpg'
      } else {
        itxt = process.env.WEB + '/vendor/bishopm/images/bluebook/' + i + '.jpg'
      }
      this.slides.push(itxt)
    }
  }
}
</script>

<style>
</style>
