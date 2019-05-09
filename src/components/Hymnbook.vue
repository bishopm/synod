<template>
  <div class="q-ma-md">
    <p class="header text-h5 text-center text-red q-mb-sm">Synod hymnbook</p>
    <q-list>
      <q-item v-for="(feed, ndx) in feeds" :key="ndx" :to="'/hymnbook/' + ndx">{{feed.feedpost.title}}</q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      feeds: []
    }
  },
  mounted () {
    this.feeds = this.$store.state.feeds
  }
}
</script>

<style>
</style>
