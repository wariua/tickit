<template>
  <v-container>
    <span>Event list from {{ src }}</span>
  </v-container>
</template>

<script>
export default {
  name: 'EventLists',

  props: ['src'],

  watch: {
    src: (newValue) => {
    }
  }
}
</script>

<style>
</style>
