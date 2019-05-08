import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      token: null,
      district: 7,
      admin: false,
      user: null,
      zoom: 1
    },
    mutations: {
      setAdmin (state, newadmin) {
        state.admin = newadmin
      },
      setToken (state, newtoken) {
        state.token = newtoken
      },
      setDistrict (state, newdistrict) {
        state.district = newdistrict
      },
      setUser (state, newuser) {
        state.user = newuser
      },
      setZoom (state, newzoom) {
        state.zoom = newzoom
      }
    },
    strict: process.env.DEV
  })
  return Store
}
