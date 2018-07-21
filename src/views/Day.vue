<template>
  <div>
    <div
      v-for="(day, index) in journey"
      :key="index"
      v-if="active==index">

      <div
        class="background-image"
        :style="{
          'background-image': 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.3)), url('+day.cover+')'
        }">
      </div>

        <main>

          <h1>{{day.title}}</h1>

          <div class="card">

            <span class="date">
              {{ day.day.seconds | moment("DD.MM.YYYY") }}
            </span>
            <span class="secondary-text">
              {{ day.places }}
            </span>
            <span class="secondary-text">
              {{ day.coordinates }}
            </span>

            <vue-markdown class="body-text">{{day.text}}</vue-markdown>

            <gallery
              :images="day.gallery"
              :index="galleryIndex"
              @close="galleryIndex = null"></gallery>

            <img
              v-for="(image, imageIndex) in day.gallery"
              :key="imageIndex"
              :src="image"
              @click="galleryIndex = imageIndex" />

          </div>
          
        </main>

    </div>
  </div>
</template>

<script>
import {db} from '@/firebase.js'
import VueMarkdown from 'vue-markdown'
import Gallery from 'vue-gallery'

export default {
  name: 'day',
  data () {
    return {
      greeting: 'Day',
      journey: [],
      active: Number(this.$route.params.day.charAt(4)-1),
      galleryIndex: null
    }
  },
  methods: {
  },
  firestore () {
    return {
      journey: db.collection('journey').orderBy('index')
    }
  },
  components: {
    VueMarkdown,
    'gallery': Gallery
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.background-image {
  background-size: cover;
  padding-top: 56.25%;
  width: 100%;
}

main {
  margin: -80px 10px 0 10px;
}

h1 {
  color: #ffffff;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  margin: 0 16px 0.5em 16px;
}

.card {
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 3px 4px rgba(0,0,0,0.1), 0 3px 11px rgba(0,0,0,0.05);
  
  box-sizing: border-box;
  font-family: 'Merriweather', serif;
  padding: 16px;
}

.date {
  color: rgba($orange, 0.5);
  display: block;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.25em;
  font-weight: 700;
  margin-bottom: 0.5em;
}

.secondary-text {
  color: $orange;
  display: block;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1em;
  line-height: 1.25em;
}

img {
  border-radius: 3px;
  display: block;
  margin-bottom: 16px;
  overflow: hidden;
  width: 100%;
}
</style>

<style lang="scss">
.body-text {
  & p {
    font-size: 1em;
    line-height: 1.8em;
    margin-bottom: 2em;
  }
}
.close {
  font-family: sans-serif;
}
</style>
