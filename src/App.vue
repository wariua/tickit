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

    <v-main>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    eventSource: null,

    eventSources: []
  })
}
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
