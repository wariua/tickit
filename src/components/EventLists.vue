<template>
  <v-container>
    <span>Event list from {{ src }}</span>
  </v-container>
</template>

<script>
export default {
  name: 'EventLists',

  props: ['src'],

  data: function () {
    return {
      eventSources: [
      ]
    }
  },

  watch: {
    src: (newValue) => {
    }
  }
}
</script>

<style>
div {
  scrollbar-width: thin;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #eee; }
::-webkit-scrollbar-thumb { background: #bbb; }
::-webkit-scrollbar-thumb:hover { background: #555; }
</style>
