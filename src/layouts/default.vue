<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar style="background-color: red;">
      <q-toolbar-title>
        <router-link to="/" class="text-white text-bold" style="text-decoration:none;">
          <q-icon size="40px" name="img:/statics/redlogo.png" class="q-mr-md"/>Natal Coastal Synod
        </router-link>
      </q-toolbar-title>
      <q-btn class="text-right text-white" flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Menu">
        <q-icon name="fas fa-bars" />
      </q-btn>
    </q-toolbar>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer side="right" v-model="rightDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label v-if="$store.state.user" class="text-center bg-black text-white q-pa-md">{{$store.state.user.user.name}}</q-item-label>
        <q-item to="/about">
          <q-item-section avatar>
            <q-icon name="fas fa-info-circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>About</q-item-label>
            <q-item-label caption>About our synod</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="'/synods/' + synodyear">
          <q-item-section avatar>
            <q-icon name="fas fa-users" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Agenda & documents</q-item-label>
            <q-item-label caption>{{synodyear}} Synod programme</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/bluebook">
          <q-item-section avatar>
            <q-icon name="fas fa-book" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Blue book</q-item-label>
            <q-item-label caption>View entire blue book</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/circuits">
          <q-item-section avatar>
            <q-icon name="fas fa-church" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Circuits</q-item-label>
            <q-item-label caption>All circuits in the synod</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/diary">
          <q-item-section avatar>
            <q-icon name="fas fa-calendar-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Diary</q-item-label>
            <q-item-label caption>Synod events</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/directory">
          <q-item-section avatar>
            <q-icon name="fas fa-address-book" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Directory</q-item-label>
            <q-item-label caption>Deacons and Ministers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/hymnbook">
          <q-item-section avatar>
            <q-icon name="fas fa-music" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Hymnbook</q-item-label>
            <q-item-label caption>Songs and liturgy</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/journey">
          <q-item-section avatar>
            <q-icon name="fas fa-hiking" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Journey</q-item-label>
            <q-item-label caption>About the Journey App</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!$store.state.user" to="/phoneverification">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-in-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline>Login</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      synodyear: ''
    }
  },
  methods: {
    logout () {
      this.$store.commit('setUser', null)
    }
  },
  mounted () {
    this.synodyear = new Date().getFullYear()
    if (localStorage.getItem('SYNOD_Version')) {
      if (localStorage.getItem('SYNOD_Version') !== process.env.VERSION) {
        this.$q.dialog({
          title: 'New version available',
          message: 'Click OK to restart the app and upgrade to version ' + process.env.VERSION + '. This new version includes: ' + process.env.VNOTES,
          ok: 'OK',
          cancel: 'LATER'
        }).onOk(() => {
          localStorage.setItem('SYNOD_Version', process.env.VERSION)
          window.location.reload()
        }).onCancel(() => {
          console.log('Delaying upgrade')
        })
      }
    } else {
      localStorage.setItem('SYNOD_Version', process.env.VERSION)
    }
    if ((localStorage.getItem('SYNOD_phonetoken')) && (localStorage.getItem('SYNOD_verifiedphone'))) {
      this.$q.loading.show({
        message: 'Welcome! Logging you in...',
        messageColor: 'white',
        spinnerSize: 250, // in pixels
        spinnerColor: 'white'
      })
      this.$axios.post(process.env.API + '/synodlogin',
        {
          phone: localStorage.getItem('SYNOD_verifiedphone'),
          phonetoken: localStorage.getItem('SYNOD_phonetoken')
        })
        .then((response) => {
          this.$store.commit('setUser', response.data)
          this.$store.commit('setAdmin', response.data.admin)
          this.$store.commit('setToken', response.data.token)
          this.$q.loading.hide()
        })
        .catch(function (error) {
          console.log(error)
          this.$q.loading.hide()
        })
    }
  }
}
</script>

<style>
</style>
