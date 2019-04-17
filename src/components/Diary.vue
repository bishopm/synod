<template>
  <div v-if="meetings.length" class="q-ma-md">
    <q-list striped>
      <q-item-label header class="text-center">Synod diary</q-item-label>
      <q-item v-for="meeting in meetings" :key="meeting.id">
        <q-item-section avatar>
          <div class="text-center">
            {{formatme(meeting.meetingdatetime).substring(0,11)}}<br>
            <b>{{formatme(meeting.meetingdatetime).substring(11)}}</b>
          </div>
        </q-item-section>
        <q-item-section>
          <div class="text-right">
            {{meeting.description}} (<router-link :to="'/societies/' + meeting.society.id">{{meeting.society.society}}</router-link>)
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div v-else  header class="text-center q-ma-md">No upcoming events in the Synod diary</div>
</template>

<script>
import saveState from 'vue-save-state'
export default {
  data () {
    return {
      meetings: []
    }
  },
  methods: {
    formatme (datein) {
      var fin = new Date(datein * 1000)
      return fin.toString().substring(4, 21)
    },
    getSaveStateConfig () {
      return {
        'cacheKey': 'Synod_Save_Diary'
      }
    }
  },
  mixins: [saveState],
  mounted () {
    this.$axios.post(process.env.API + '/meetings/search',
      {
        scope: 'district',
        id: this.$store.state.district
      })
      .then(response => {
        this.meetings = response.data.meetings
        this.entity = response.data.entity
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>

<style>
</style>
