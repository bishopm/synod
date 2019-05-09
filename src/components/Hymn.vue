<template>
  <div class="q-ma-md">
    <p v-html="hymn.feedpost[0].body"></p>
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
