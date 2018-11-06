<template>
  <div>
    <day />
    <page-control :active="active" />
  </div>
</template>

<script>
// import app from '@/firebase.js'

import PageControl from '@/components/PageControl.vue'
import Day from '@/components/DayDetail.vue'

export default {
  name: 'Day',
  data () {
    return {
      active: null
    }
  },
  components: {
    'page-control': PageControl,
    'day': Day
  },
  methods: {
    setActive () {
      this.active = Number(this.$route.params.day)
    }
  },
  created () {
    this.setActive()
  },
  watch: {
    $route (to, from) {
      this.setActive()
    }
  }
}
</script>
