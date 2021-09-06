<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        v-bind:id="'item-' + item.id"
        outlined
        v-bind:color="item.new ? 'lime lighten-5' : undefined"
        class="event-item ma-1"
        v-bind:class="item.focused ? 'event-item-focused' : ''"
        v-bind:ripple="false"
      >
        <v-list-item class="pa-0 ma-1">
          <v-list-item-content class="pa-1">
            <v-list-item-title class="font-weight-bold">
              {{ item.title }}
            </v-list-item-title>

            <v-layout>
              <v-flex xs2>
                <v-img
                  v-bind:src="item.imgUrl"
                  height=60
                  contain
                />
              </v-flex>

              <v-flex xs10 class="pa-1">
                <div class="description">
                  {{ date }}<br>
                  {{ item.place }}
                </div>
              </v-flex>
            </v-layout>
          </v-list-item-content>
        </v-list-item>

        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#aaa"
            opacity=0.3
          >
            <v-btn
              v-if="toLeft"
              icon
              x-large
              color="black"
              justify="center"
              v-on:click="$emit('move', item.id, 'left')"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-icon
              v-if="!toLeft"
              x-large
              color="transparent"
            >
              mdi-arrow-left
            </v-icon>

            <v-btn
              icon
              x-large
              class="mx-6"
              color="black"
              v-on:click="$emit('open', item.id)"
            >
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>

            <v-btn
              v-if="toRight"
              icon
              x-large
              color="black"
              v-on:click="$emit('move', item.id, 'right')"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-icon
              v-if="!toRight"
              x-large
              color="transparent"
            >
              mdi-arrow-right
            </v-icon>
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: 'EventItem',

  props: {
    item: Object,
    toLeft: Boolean,
    toRight: Boolean
  },

  computed: {
    date: function () {
      if (this.item.dateFrom.getTime() === this.item.dateTo.getTime()) {
        const weekday = this.item.dateFrom.toLocaleDateString(undefined, { weekday: 'short' })
        return this.item.dateFrom.toLocaleDateString() + ' (' + weekday + ')'
      } else {
        return this.item.dateFrom.toLocaleDateString() + ' ~ ' +
          this.item.dateTo.toLocaleDateString()
      }
    }
  },

  watch: {
    focus: function (newValue) {
    }
  }
}
</script>

<style>
</style>
