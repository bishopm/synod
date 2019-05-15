<template>
  <div>
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-black text-white">
      <q-tab name="songPanel">Hymns</q-tab>
      <q-tab name="liturgyPanel">Liturgy</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel name="songPanel" class="no-border">
        <q-item v-for="(song, ndx) in songs" :key="song.id" :to="'/hymnbook/' + song.id">{{ndx+1}}. {{song.post.title}}</q-item>
      </q-tab-panel>
      <q-tab-panel name="liturgyPanel" class="no-border">
        <q-item v-for="liturgy in liturgies" :key="liturgy.id" :to="'/hymnbook/' + liturgy.id">{{liturgy.post.title}}</q-item>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songs: [],
      liturgies: [],
      selectedTab: ''
    }
  },
  computed: {
    allSongs: function () {
      return this.feeds.filter(function (item) {
        return item.feedposnumber % 2 === 0
      })
    }
  },
  mounted () {
    for (var fndx in this.$store.state.feeds) {
      if (this.$store.state.feeds[fndx].feedpost.category === 'liturgy') {
        this.liturgies.push({ id: fndx, post: this.$store.state.feeds[fndx].feedpost })
      } else {
        this.songs.push({ id: fndx, post: this.$store.state.feeds[fndx].feedpost })
      }
    }
    this.selectedTab = 'songPanel'
  }
}
</script>

<style>
.q-item {
  min-height: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
