<template>
  <v-card
    height="100%"
    flat
  >
    <v-tabs
      v-model="tab"
      grow
      height=10
      slider-size=8
    >
      <v-tabs-slider color="blue-grey lighten-3"></v-tabs-slider>

      <v-tab
        v-for="list in lists"
        v-bind:key="list"
        v-bind:href="`#tab-${list}`"
      >
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="height: calc(100% - 10px)">
      <v-tab-item
        v-for="list in lists"
        v-bind:key="list"
        v-bind:value="'tab-' + list"
        style="height: calc(100% + 10px)"
      >
        <v-list max-height="100%" class="overflow-y-auto py-0">
          <event-item
            v-for="ev in events[list]"
            v-bind:key="ev.id"
            v-bind:id="'event-' + ev.id"
            v-bind:item="ev"
            v-bind:to-left="list != 'left'"
            v-bind:to-right="list != 'right'"
            v-on:open="openEvent"
            v-on:move="moveEvent"
          />
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import isElectron from 'is-electron'
import EventItem from './EventItem'

export default {
  name: 'EventLists',

  components: {
    EventItem
  },

  props: ['src'],

  data: function () {
    return {
      lists: ['left', 'center', 'right'],

      allEvents: {
        left: [],
        center: [],
        right: []
      },

      tab: 'tab-center',

      eventSources: [
        {
          id: 'interpark-musical',
          text: '인터파크 뮤지컬',
          url: 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Mus&Sort=5',
          parse: this.parseInterpark,
          eventUrl: this.eventUrlInterpark
        },
        {
          id: 'interpark-concert',
          text: '인터파크 콘서트',
          url: 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Liv&Sort=5',
          parse: this.parseInterpark,
          eventUrl: this.eventUrlInterpark
        },
        {
          id: 'interpark-classic',
          text: '인터파크 클래식/무용',
          url: 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Cla&Sort=5',
          parse: this.parseInterpark,
          eventUrl: this.eventUrlInterpark
        },
        {
          id: 'interpark-drama',
          text: '인터파크 연극',
          url: 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Dra&Sort=5',
          parse: this.parseInterpark,
          eventUrl: this.eventUrlInterpark
        },
        {
          id: 'interpark-les',
          text: '인터파크 전시/행사',
          url: 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Eve&SubCa=Eve_T&Sort=5',
          parse: this.parseInterpark,
          eventUrl: this.eventUrlInterpark
        },
        {
          id: 'interpark-family',
          text: '인터파크 아동/가족',
          url: 'http://ticket.interpark.com/TPGoodsList.asp?Ca=Fam&Sort=5',
          parse: this.parseInterpark,
          eventUrl: this.eventUrlInterpark
        }
      ]
    }
  },

  computed: {
    events: function () {
      return {
        left: this.allEvents.left,
        center: this.allEvents.center,
        right: this.allEvents.right
      }
    }
  },

  watch: {
    src: function (newValue) {
      this.fetchEvents(newValue)
    },

    allEvents: function (newValue) {
      this.$store.commit('setEventIds', {
        srcId: this.src,
        eventIds: {
          left: newValue.left.map(ev => ev.id),
          center: newValue.center.map(ev => ev.id),
          right: newValue.right.map(ev => ev.id)
        }
      })
    }
  },

  methods: {
    fetchEvents (src) {
      const eventSource = this.eventSources.find(x => x.id === src)

      /* NOTE: Browsers will return emptry responses by CORS policy.
       * Here are two workarounds:
       *
       * - Run in electron with webSecurity=false, which disables CORS
       *   check.
       * - Enable the proxy in the dev server that relays unknown requests
       *   to a predefined server.
       */
      let url = eventSource.url
      if (!isElectron()) {
        const parsed = new URL(url)
        url = parsed.pathname + parsed.search
      }

      fetch(url, {
        credentials: 'omit',
        referrerPolicy: 'no-referrer'
      })
        .then(response => response.arrayBuffer())
        .then(bytes => eventSource.parse(bytes))
        .then(events => this.sortEvents(events))
        .then(events => this.updateLists(events))
    },

    sortEvents (events) {
      return events.sort((a, b) => a.dateFrom.localeCompare(b.dateFrom))
    },

    parseInterpark (bytes) {
      const decoder = new TextDecoder('euc-kr')
      const parser = new DOMParser()
      const doc = parser.parseFromString(decoder.decode(bytes), 'text/html')
      const rows = doc.querySelectorAll('div.stit tr')

      const events = []

      for (const row of rows) {
        const aThumb = row.querySelector('td.RKthumb a')
        if (aThumb === null) { // table header
          continue
        }
        const id = aThumb.href.split('=').pop()
        const imgUrl = aThumb.querySelector('img').src

        const aTitle = row.querySelector('td.RKtxt a')
        const title = aTitle.text

        const tdPlaceAndDate = row.querySelectorAll('td.Rkdate')
        const place = tdPlaceAndDate[0].querySelector('a').text
        const datePair = tdPlaceAndDate[1].innerText
          .replace(/\s+/g, '').split('~')

        events.push({
          id,
          title,
          imgUrl,
          place,
          dateFrom: datePair[0],
          dateTo: datePair[1]
        })
      }

      return events
    },

    updateLists (events) {
      const eventIds = this.$store.getters.getEventIds(this.src)
      const allEvents = {
        left: [],
        center: [],
        right: []
      }
      const newEvents = []

      for (const ev of events) {
        if (eventIds.left.find(id => id === ev.id)) {
          allEvents.left.push(ev)
        } else if (eventIds.center.find(id => id === ev.id)) {
          allEvents.center.push(ev)
        } else if (eventIds.right.find(id => id === ev.id)) {
          allEvents.right.push(ev)
        } else {
          newEvents.push(ev)
        }
      }

      allEvents.center = allEvents.center.concat(newEvents)

      this.sortEvents(allEvents.left)
      this.sortEvents(allEvents.center)
      this.sortEvents(allEvents.right)

      this.allEvents = allEvents
    },

    eventUrlInterpark (id) {
      return 'http://ticket.interpark.com/Ticket/Goods/GoodsInfo.asp?GroupCode=' + id
    },

    openEvent (id) {
      const eventSource = this.eventSources.find(x => x.id === this.src)
      this.$emit('open-event-detail', eventSource.eventUrl(id))
    },

    moveEvent (id, dir) {
      let src, dst
      let ev
      const allEvents = {
        left: this.allEvents.left,
        center: this.allEvents.center,
        right: this.allEvents.right
      }

      if ((ev = allEvents.center.find(x => x.id === id))) {
        src = 'center'
        dst = dir === 'left' ? 'left' : 'right'
      } else if (dir === 'left') {
        ev = allEvents.right.find(x => x.id === id)
        src = 'right'
        dst = 'center'
      } else {
        ev = allEvents.left.find(x => x.id === id)
        src = 'left'
        dst = 'center'
      }

      allEvents[src] = allEvents[src].filter(x => x.id !== id)
      allEvents[dst] = this.sortEvents(allEvents[dst].concat(ev))
      this.allEvents = allEvents
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
