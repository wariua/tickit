<template>
  <v-app>
    <v-app-bar
      app
      fixed
      color="primary"
      dark
    >
      <v-select
        v-bind:items="eventSources"
        v-model="eventSource"
        placeholder="공연 목록을 선택해 주세요."
        outlined
        hide-details
        dense
        autofocus
      />

      <v-spacer></v-spacer>

      <v-dialog
        width=800
        scrollable
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-map-marker-remove</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            감출 공연장
          </v-card-title>

          <v-card-text
            style="height: 400px"
          >
            <div>
              <v-chip
                v-for="place in hiddenPlaces"
                v-bind:key="place"
                class="ma-1"
                color="primary"
                close
                v-on:click:close="$store.commit('unhidePlace', { place })"
              >
                {{ place }}
              </v-chip>
            </div>

            <div>
              <v-chip
                v-for="place in unhiddenPlaces"
                v-bind:key="place"
                class="ma-1"
                color="primary"
                outlined
                close
                close-icon="mdi-check"
                v-on:click:close="$store.commit('hidePlace', { place })"
              >
                {{ place }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-btn
        icon
        disabled
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main id="main-container">
      <v-navigation-drawer
        permanent
        absolute
        width=300
      >
        <event-lists
          v-bind:src="eventSource"
          v-on:open-event-detail="openEventDetail"
        />
      </v-navigation-drawer>

      <event-detail
        v-bind:href="eventUrl"
      />
    </v-main>
  </v-app>
</template>

<script>
import EventLists from './components/EventLists'
import EventDetail from './components/EventDetail'

export default {
  name: 'App',

  components: {
    EventLists,
    EventDetail
  },

  data: () => ({
    eventSource: null,
    eventUrl: null
  }),

  computed: {
    eventSources: () => {
      return EventLists.data().eventSources.map(src => ({
        text: src.text,
        value: src.id
      }))
    },

    hiddenPlaces () {
      return this.$store.state.hiddenPlaces
    },

    unhiddenPlaces () {
      const allPlaces = this.$store.state.allPlaces
      return allPlaces.filter(p => !this.$store.state.hiddenPlaces.includes(p))
    }
  },

  methods: {
    openEventDetail (url) {
      this.eventUrl = url
    }
  }
}
</script>

<style lang="scss">
html {
  overflow-y: auto !important;
}

#main-container {
  height: 100vh;
}
</style>
