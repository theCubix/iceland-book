<template>
  <div>
    <h1>Welcome to the {{ greeting }}-Page!</h1>
    <router-link
      v-for="(day, index) in days"
      :key="index"
      :to="`/journey/day/${day.tripIndex}`">
      {{ day.title }}
    </router-link>
  </div>
</template>

<script>
import app from '@/firebase.js'

export default {
  name: 'journey',
  data () {
    return {
      greeting: 'Journey',
      days: []
    }
  },
  methods: {
    getDays() {
      app.content.get('days', { fields: [ 'title', 'tripIndex' ]})
        .then(days => this.days = days)
        .catch(error => console.log(error))
    }
  },
  created () {
    this.getDays()
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 320px;
  max-width: 100%;
}
</style>
