<template>
  <div>
    <h1>Welcome to the {{ greeting }}-Page!</h1>
    <router-link
      v-for="(day, index) in journey"
      :key="index"
      :to="'/journey/'+day.slug">
        {{day.title}}<br/>
    </router-link>
  </div>
</template>

<script>
import {db} from '@/firebase.js'

export default {
  name: 'journey',
  data () {
    return {
      greeting: 'Journey',
      journey: []
    }
  },
  firestore () {
    return {
      journey: db.collection('journey').orderBy('day')
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 320px;
  max-width: 100%;
}
</style>
