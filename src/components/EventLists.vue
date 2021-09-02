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
        {
          id: 'interpark-musical',
          text: '인터파크 뮤지컬'
        },
        {
          id: 'interpark-concert',
          text: '인터파크 콘서트'
        },
        {
          id: 'interpark-classic',
          text: '인터파크 클래식/무용'
        },
        {
          id: 'interpark-drama',
          text: '인터파크 연극'
        },
        {
          id: 'interpark-les',
          text: '인터파크 전시/행사'
        },
        {
          id: 'interpark-family',
          text: '인터파크 아동/가족'
        }
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
