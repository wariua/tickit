import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    eventIds: {}
  },

  getters: {
    getEventIds: (state) => (srcId) => {
      return state.eventIds[srcId] ||
        { left: [], center: [], right: [] }
    }
  },

  mutations: {
    setEventIds (state, payload) {
      state.eventIds[payload.srcId] = payload.eventIds
    }
  },

  plugins: [vuexLocalStorage.plugin]
})
