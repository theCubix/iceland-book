<template>
  <div>
    <h1>Welcome to the {{ greeting }}-Page!</h1>
    <div v-for="(day, index) in journey" :key="index">
      <img :src="day.cover" alt="">
      <h2>{{day.title}}</h2>
      <vue-markdown>{{day.text}}</vue-markdown>
      <img :src="img.thumb" alt="" v-for="(img, index) in day.gallery" :key="index">
    </div>
  </div>
</template>

<script>
import {db} from '@/firebase.js'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'day',
  data () {
    return {
      greeting: 'Day',
      journey: []
    }
  },
  firestore () {
    return {
      journey: db.collection('journey').where('slug', '==', this.$route.params.day)
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 320px;
  max-width: 100%;
}
</style>
