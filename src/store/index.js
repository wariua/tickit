import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  filter: (mutation) => mutation.type === 'setEventIds' ||
                        mutation.type === 'hidePlace' ||
                        mutation.type === 'unhidePlace'
})

export default new Vuex.Store({
  state: {
    eventIds: {},

    hiddenPlaces: [],
    allPlaces: []
  },

  getters: {
    getEventIds: (state) => (srcId) => {
      return state.eventIds[srcId] ??
        { left: [], center: [], right: [] }
    }
  },

  mutations: {
    setEventIds (state, payload) {
      state.eventIds[payload.srcId] = payload.eventIds
    },

    hidePlace (state, payload) {
      state.hiddenPlaces = state.hiddenPlaces.concat(payload.place).sort()
    },

    unhidePlace (state, payload) {
      state.hiddenPlaces = state.hiddenPlaces.filter(p => p !== payload.place)
    },

    setAllPlaces (state, payload) {
      state.allPlaces = payload.allPlaces.sort()
    }
  },

  plugins: [vuexLocalStorage.plugin]
})
