<template>
  <div class="container q-pa-lg">
    <q-pdfviewer v-model="show" :src="src" content-class="absolute"/>
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
.container {
  max-width: 100%;
  max-height: 100%;
  min-width: 400px;
  min-height: 600px;
  width: 100%;
  height: 100%;
}
</style>
