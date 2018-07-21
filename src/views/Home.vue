<template>
  <div>
    <h1>Welcome to the {{ greeting }}-Page!</h1>
    <div v-for="(day, index) in journey" :key="index">
      <img :src="day.cover" alt="">
      <h2>{{day.title}}</h2>
      <vue-markdown>{{day.text}}</vue-markdown>
    </div>
  </div>
</template>

<script>
import {db} from '@/firebase.js'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'home',
  data () {
    return {
      greeting: 'Home',
      journey: []
    }
  },
  firestore () {
    return {
      journey: db.collection('journey').orderBy('day')
    }
  },
  components: {
    VueMarkdown
  }
}
</script>
