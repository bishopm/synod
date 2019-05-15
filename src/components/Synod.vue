<template>
  <div class="q-ma-md">
    <div class="header text-center">{{$route.params.year}} Synod <small class="text-grey">{{circuit}}</small></div>
    <q-tabs v-model="tab" dense class="text-grey q-mt-md" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
      <q-tab name="agenda" label="Agenda" />
      <q-tab name="documents" label="Documents" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="agenda">
        <q-expansion-item v-if="$store.state.user.admin" v-model="aexpanded" class="text-center text-red" label="Add new agenda item">
          <div class="q-ma-md">
            <q-input outlined hide-bottom-space error-message="Description is required" label="Description" v-model="agenda.description" />
          </div>
          <div class="q-ma-md">
            <q-select label="Date" outlined v-model="agenda.agendadate" :options="dateOptions" map-options emit-value/>
          </div>
          <div class="q-ma-md">
            <q-input outlined label="Start time" v-model="agenda.agendatime" mask="time" :rules="['time']">
              <template v-slot:append>
                <q-icon name="fa fa-clock" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-time v-model="agenda.agendatime" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn @click="submitAgenda" color="primary" label="OK"/><q-btn class="q-ml-md" @click="aexpanded = false" color="grey" label="Cancel"/>
          </div>
        </q-expansion-item>
        <q-list v-if="agendaitems">
          <q-item v-for="agenda in agendaitems" :key="agenda.id">
            <q-item-section avatar>
              <div class="text-center">
                <b>{{formatme(agenda.meetingdatetime).substring(11)}}</b><br>
                {{formatme(agenda.meetingdatetime).substring(0,11)}}
              </div>
            </q-item-section>
            <q-item-section>
              <div class="text-right">
                {{agenda.description}}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel name="documents">
        <q-expansion-item v-if="$store.state.user.admin" v-model="dexpanded" class="text-center text-red" label="Add new document">
          <div class="q-ma-md">
            <q-input outlined hide-bottom-space error-message="Document title is required" label="Title" v-model="doc.title" />
          </div>
          <div class="q-ma-md">
            <q-input class="q-mt-md" outlined type="file" id="docfile" ref="docfile" />
            <div class="q-ma-md text-center">
              <q-btn type="button" @click="uploadFile">Upload file</q-btn>
            </div>
          </div>
        </q-expansion-item>
        <div class="col-12 q-mx-md"><q-input autofocus placeholder="Search for a document" @input="updateFilter" v-model="search" /></div>
        <q-list>
          <q-item v-for="document in filteredDocuments" :key="document.id" :to="'/document/' + document.url">
            <q-item-section>
              {{document.title}}
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aexpanded: false,
      circuit: '',
      dateOptions: [],
      dexpanded: false,
      filteredDocuments: [],
      file: null,
      items: [],
      synod: {},
      tab: 'agenda',
      documents: [],
      agendaitems: [],
      agenda: {
        description: '',
        agendadate: '',
        agendatime: ''
      },
      doc: {
        title: ''
      },
      search: ''
    }
  },
  methods: {
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toString().substring(4, 21)
    },
    deleteme () {
      console.log('deleting')
    },
    updateFilter () {
      if (this.search === '') {
        this.filteredDocuments = this.documents
      } else {
        this.filteredDocuments = []
        for (var dndx in this.documents) {
          if ((this.documents[dndx].title.toLowerCase().includes(this.search.toLowerCase())) || (this.documents[dndx].title.toLowerCase().includes(this.search.toLowerCase()))) {
            this.filteredDocuments.push(this.documents[dndx])
          }
        }
      }
    },
    uploadFile () {
      if (this.doc.title) {
        this.file = this.$refs.docfile.$refs.input.files[0]
        let formData = new FormData()
        formData.append('file', this.file)
        formData.append('title', this.doc.title)
        formData.append('synod_id', 1)
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
        this.$axios.post(process.env.API + '/synoddocs', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            this.$q.notify('Document has been uploaded')
            this.documents.push(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        this.$q.notify('Title may not be blank!')
      }
    },
    submitAgenda () {
      this.aexpanded = false
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.post(process.env.API + '/agendaitems',
        {
          agenda: this.agenda
        })
        .then(response => {
          this.agendaitems.push(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.doc = {}
    this.$axios.post(process.env.API + '/synods',
      {
        district: this.$store.state.district,
        synodyear: this.$route.params.year
      })
      .then(response => {
        this.synod = response.data.synod
        this.documents = response.data.documents
        this.agendaitems = response.data.agendaitems
        this.circuit = this.synod.circuit.circuit
        this.dateOptions = response.data.days
        this.filteredDocuments = this.documents
        this.agenda.description = ''
        this.agenda.agendatime = ''
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
.q-item {
  min-height: 0px;
  padding-bottom: 0px;
}
</style>
