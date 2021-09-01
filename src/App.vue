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
      >
        <v-icon>mdi-map-marker-remove</v-icon>
      </v-btn>

      <v-btn
        icon
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main id="main-container">
      <multipane class="virtical-panes" layout="vertical">
        <div class="pane" :style="{ minWidth: '200px', width: '300px' }">
          <event-lists
            v-bind:src="eventSource"
            v-on:open-event-detail="openEventDetail"
          />
        </div>
        <multipane-resizer/>
        <div class="pane" :style="{ flexGrow: 1 }">
          <event-detail
            v-bind:href="eventUrl"
          />
        </div>
      </multipane>
    </v-main>
  </v-app>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'
import EventLists from './components/EventLists'
import EventDetail from './components/EventDetail'

export default {
  name: 'App',

  components: {
    Multipane,
    MultipaneResizer,
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

.virtical-panes {
  width: 100%;
  height: 100%;
}

.virtical-panes > .multipane-resizer {
  margin: 0; left: 0;
  position: relative;

  width: 7px;

  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -10px;
    margin-left: -1.5px;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  &:hover {
    background-color: #ddd;

    &:before {
      border-color: #999;
    }
  }
}
</style>
