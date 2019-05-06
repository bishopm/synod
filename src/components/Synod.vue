<template>
  <div class="q-ma-md">
    <div v-if="synod" class="header text-center">{{$route.params.year}} Synod <small class="text-grey">{{synod.circuit.circuit}}</small>
      <q-btn v-if="$store.state.admin" class="q-ml-md" color="primary" icon="fa fa-plus" round size="sm" @click="addContent"></q-btn>
    </div>
    <div v-else class="header text-center">{{$route.params.year}} Synod</div>
    <q-tabs v-model="tab" dense class="text-grey q-mt-md" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
      <q-tab name="agenda" label="Agenda" />
      <q-tab name="documents" label="Documents" />
      <q-tab name="resolutions" label="Resolutions" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="agenda">
        <q-expansion-item v-if="$store.state.admin" v-model="aexpanded" class="text-center text-red" label="Add new agenda item">
          <div class="q-ma-md">
            <q-input outlined hide-bottom-space error-message="Description is required" label="Description" v-model="agenda.description" />
          </div>
          <div class="q-ma-md">
            <q-select label="Venue" outlined v-model="agenda.venue" :options="[{ label: 'female', value: 'female' }, { label: 'male', value: 'male' }]" map-options emit-value/>
          </div>
          <div class="q-ma-md">
            <q-input outlined label="Date and time" v-model="agenda.meetingdatetime" mask="datetime">
              <template v-slot:append>
                <q-icon name="fa fa-calendar" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="agenda.meetingdatetime" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-expansion-item>
        <q-list v-if="synod.agendaitems">
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
        <q-expansion-item v-if="$store.state.admin" v-model="dexpanded" class="text-center text-red" label="Add new document">
          <div class="q-ma-md">
            <q-input outlined hide-bottom-space error-message="Document title is required" label="Title" v-model="doc.title" />
          </div>
          <div class="q-ma-md">
            <q-uploader :url="url" name="doc" :multiple="false" color="red" flat bordered style="width: 100%"/>
          </div>
        </q-expansion-item>
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
      aexpanded: false,
      dexpanded: false,
      items: [],
      synod: {},
      tab: 'agenda',
      agenda: {},
      doc: {},
      url: process.env.API + '/documents/upload'
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
    },
    addContent () {
      console.log('adding')
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
