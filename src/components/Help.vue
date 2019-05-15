<template>
  <div class="q-ma-md text-justify">
    <p class="header text-h5 text-center text-red q-mb-sm">Help and feedback</p>
    <p>We've built this app to make it easier to get synod information out to all of our people. If you think it can be improved, please send us your ideas! Also, feel free to tell others in your circuits that they can access the app on phones, tablets or PC's at: <span class="text-red">https://natalcoastalsynod.org.za</span>.</p>
    <p>If you're experiencing problems with the app or have a suggestion, send us a message below:</p>
    <q-form>
      <q-input v-model="name" label="Name"/>
      <q-input v-model="email" class="q-my-sm" label="Email"/>
      <q-input v-model="message" outlined type="textarea"/>
      <div class="text-center">
        <q-btn @click="sendmessage" color="secondary" class="q-ma-md" label="Send feedback"></q-btn>
      </div>
    </q-form>
    <p>While you're here, you may also be interested in something we have developed for individuals and societies. Click <router-link class="text-primary" to="/journey">here</router-link> to find out about the Journey App.</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      name: '',
      email: ''
    }
  },
  mounted () {
    if (this.$store.state.user) {
      this.name = this.$store.state.user.anem
    }
  },
  methods: {
    sendmessage () {
      this.$axios.post(process.env.API + '/feedback',
        {
          message: this.message,
          name: this.name,
          email: this.email,
          phone: localStorage.getItem('SYNOD_verifiedphone')
        })
        .then(response => {
          this.$q.notify('Thank you for your feedback!')
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
</style>
