<template>
  <iframe
    id="event-detail-frame"
    v-bind:src="href"
  />
</template>

<script>
export default {
  name: 'EventDetail',

  props: {
    href: {
      type: String,
      default: 'about:blank'
    }
  }
}
</script>

<style>
#event-detail-frame {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
