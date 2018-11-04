<template>
  <div>
    <day />
    <page-control :previous="previous" :next="next" />
  </div>
</template>

<script>
import app from '@/firebase.js'

import PageControl from '@/components/PageControl.vue'
import Day from '@/components/DayDetail.vue'

export default {
  name: 'Day',
  data () {
    return {
      active: null,
      entriesLength: null,
      previous: null,
      next: null
    }
  },
  components: {
    'page-control': PageControl,
    'day': Day
  },
  methods: {
    setActive () {
      this.active = Number(this.$route.params.day)
    },
    getAll () {
      app.content.get('days', { fields: [ 'id' ] })
        .then(res => {(
          this.entriesLength = Object.keys(res).length)
          this.setPrevious()
          this.setNext()
        })
        .catch(err => console.log(err))
    },
    setPrevious () {
      if (this.active > 1) {
        let prev = this.active - 1
        this.previous = prev
      } else {
        this.previous = null
      }
    },
    setNext () {
      if (this.active < this.entriesLength) {
        let nex = this.active + 1
        this.next = nex
      } else {
        this.next = null
      }
    }
  },
  created () {
    this.setActive()
    this.getAll()
  },
  watch: {
    $route (to, from) {
      this.setActive()
      this.setPrevious()
      this.setNext()
    }
  }
}
</script>
