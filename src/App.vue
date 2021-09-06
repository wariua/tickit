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
        prepend-icon="mdi-calendar-text"
        outlined
        hide-details
        dense
        autofocus
      />

      <v-spacer></v-spacer>

      <v-btn
        icon
        disabled
      >
        <v-icon>mdi-map-marker-remove</v-icon>
      </v-btn>

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
