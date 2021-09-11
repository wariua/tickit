<template>
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
</template>

<script>
export default {
  name: 'HiddenPlacesDialog',

  computed: {
    hiddenPlaces () {
      return this.$store.state.hiddenPlaces
    },

    unhiddenPlaces () {
      const allPlaces = this.$store.state.allPlaces
      return allPlaces.filter(p => !this.$store.state.hiddenPlaces.includes(p))
    }
  }
}
</script>
