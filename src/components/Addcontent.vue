<template>
  <div v-if="$store.state.user && $store.state.user.admin === true">
    <q-tabs v-model="selectedTab" active-color="white" indicator-color="primary" class="no-border bg-black text-white">
      <q-tab name="bluebook">Blue Book</q-tab>
      <q-tab name="hymnbook">Hymnbook</q-tab>
    </q-tabs>
    <q-tab-panels v-model="selectedTab" animated class="q-ma-sm">
      <q-tab-panel name="bluebook" class="no-border">
        <div class="text-justify">
          Locate an image on your device and click upload - it will be appended to the end of the Blue Book.
        </div>
        <q-input class="q-mt-md" outlined type="file" id="file" ref="file" />
        <div class="q-ma-md text-center">
          <q-btn type="button" @click="uploadFile">Upload file</q-btn>
        </div>
      </q-tab-panel>
      <q-tab-panel name="hymnbook" class="no-border">
        <q-form ref="hymnform" @submit="submithymn">
          <q-input outlined hide-bottom-space error-message="Title is required" class="q-mb-md" v-model="post.title" label="Title" :rules="[ val => val.length >= 1 ]"/>
          <q-select outlined v-model="post.category" :options="['hymn', 'liturgy']" label="Category"/>
          <q-editor v-model="post.body" class="q-my-md" min-height="400px"/>
          <div class="text-center">
            <q-btn :label="'Submit ' + post.category" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedTab: 'bluebook',
      imageurl: process.env.API + '/bluebookimage',
      file: null,
      post: {
        title: '',
        body: '',
        category: 'liturgy',
        library: 'no',
        publicationdate: '2019-01-01'
      }
    }
  },
  methods: {
    submithymn () {
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/feeditems',
        {
          post: this.post,
          synod: 1
        })
        .then(response => {
          this.$q.notify('Your content has been published')
          this.$router.push({ name: 'home' })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    uploadFile () {
      this.file = this.$refs.file.files[0]
      let formData = new FormData()
      formData.append('file', this.file)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/bluebookimage', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.$q.notify('A new page has been added to the end of the Blue Book')
          this.$store.commit('setBluebook', response.data.bluebook)
          this.$router.push({ name: 'home' })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.q-item {
  min-height: 0px;
}
</style>
