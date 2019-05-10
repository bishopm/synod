<template>
  <div class="q-ma-md">
    <div v-if="hymn.feedpost" class="q-mx-md">
      <p class="text-center bg-secondary q-pa-sm text-white text-bold">{{hymn.feedpost.title}}</p>
      <p v-html="hymn.feedpost.body"></p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hymn: {}
    }
  },
  mounted () {
    this.hymn = this.$store.state.feeds[this.$route.params.id]
  }
}
</script>

<style>
.compact {
  min-height: 0px;
  padding-bottom: 0px;
  padding-top: 0px;
  margin-bottom: 6px;
}
h5 {
  margin-block-start: 5px;
  margin-block-end: 0px;
}
</style>
