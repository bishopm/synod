<template>
  <div style="width:100%; height:300px;">
    <l-map ref="map" :bounds="bounds" :padding="[30, 30]" :zoom="zoom" :maxZoom="maxZoom" style="height: 400px; width: 100%">
      <l-control-layers />
      <l-tile-layer v-for="tileProvider in tileProviders" :key="tileProvider.name" :name="tileProvider.name" :visible="tileProvider.visible" :url="tileProvider.url" :attribution="tileProvider.attribution" :token="token" :options="tileProvider.options" layerType="base"/>
      <l-marker v-for="marker in markers" :key="marker.title.society.id" :lat-lng="getcoords(marker)" :icon="icon" :draggable="false">
        <l-popup>
          <router-link :to="'/societies/' + marker.title.society.id">{{marker.title.society.society}}</router-link>
          - <router-link :to="'/circuits/' + marker.title.circuit.id">{{marker.title.circuit.circuit}}</router-link>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LControlLayers, LMarker, LPopup } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
export default {
  data () {
    return {
      name: 'leafletclustermap',
      tileProviders: [
        {
          name: 'Standard',
          visible: true,
          attribution: '',
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          options: {}
        },
        {
          name: 'Satellite',
          visible: false,
          attribution: '',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          options: {}
        }
      ],
      token: 'pk.eyJ1IjoiYmlzaG9wbSIsImEiOiJjanNjenJ3MHMwcWRyM3lsbmdoaDU3ejI5In0.M1x6KVBqYxC2ro36_Ipz_w',
      zoom: 13,
      maxZoom: 16,
      icon: null
    }
  },
  props: ['markers', 'rawbounds'],
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-popup': LPopup,
    LControlLayers,
    LMarker
  },
  methods: {
    getcoords (marker) {
      return L.latLng(parseFloat(marker.lat), parseFloat(marker.lng))
    },
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },
    noGeoLocation (error) {
      alert('No funciona' + error.message)
    }
  },
  mounted () {
    this.icon = L.icon({
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconSize: [24, 36],
      iconAnchor: [12, 36]
    })
  },
  computed: {
    bounds () {
      return [
        [this.rawbounds.minlat, this.rawbounds.minlng],
        [this.rawbounds.maxlat, this.rawbounds.maxlng]
      ]
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
