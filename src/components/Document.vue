<template>
  <div class="container q-pa-lg">
    <q-pdfviewer v-model="show" src="https://church.net.za/plan/lower-tugela" content-class="absolute"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
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
