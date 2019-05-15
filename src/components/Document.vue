<template>
  <div class="q-page flex flex-center" style="min-height: calc(100vh - 98px);">
    <q-pdfviewer class="q-pdfviewer absolute" style="width:94%;" v-model="show" :src="src"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
      src: ''
    }
  },
  mounted () {
    this.src = process.env.WEB + '/vendor/bishopm/docs/' + this.$route.params.src
  }
}
</script>

<style>
</style>
