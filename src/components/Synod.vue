<template>
  <div class="q-ma-md">
    <div class="header text-center">{{$route.params.year}} Synod <small class="text-grey">{{synod.circuit.circuit}}</small></div>
    <q-tabs v-model="tab" dense class="text-grey q-mt-md" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
      <q-tab name="agenda" label="Agenda" />
      <q-tab name="documents" label="Documents" />
      <q-tab name="resolutions" label="Resolutions" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="agenda">
        <q-list>
          <q-item v-for="agenda in synod.agendaitems" :key="agenda.id">
            <q-item-section avatar>
              <div class="text-center">
                <b>{{formatme(agenda.meetingdatetime).substring(11)}}</b><br>
                {{formatme(agenda.meetingdatetime).substring(0,11)}}
              </div>
            </q-item-section>
            <q-item-section>
              <div class="text-right">
                {{agenda.description}} (<router-link :to="'/societies/' + agenda.society.id">{{agenda.society.society}}</router-link>)
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel name="documents">
        <q-list>
          <q-item v-for="document in synod.documents" :key="document.id">
            {{document.title}}
          </q-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel name="resolutions">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      items: [],
      synod: {},
      tab: 'agenda'
    }
  },
  methods: {
    getSaveStateConfig () {
      return {
        'cacheKey': 'Synod_Save_Synod'
      }
    },
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toString().substring(4, 21)
    }
  },
  mixins: [saveState],
  mounted () {
    this.$axios.post(process.env.API + '/synods',
      {
        district: this.$store.state.district,
        synodyear: this.$route.params.year
      })
      .then(response => {
        this.synod = response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
