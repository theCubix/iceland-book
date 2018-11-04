<template>
  <div>
    <div v-for="(item, index) in current" :key="index">
      <responsive-image
        :src="item.coverImage[0]"
        :contentAware="true"/>
      <main>
        <h1>{{ item.title }}</h1>

        <div class="card">
          
          <span class="date">
            {{ item.date | moment("DD.MM.YYYY") }}
          </span>
          <span class="secondary-text">
            {{ item.places }}
          </span>
          <span class="secondary-text">
            {{ item.coordinates }}
          </span>
          <vue-markdown class="body-text">{{ item.bodyCopy }}</vue-markdown>

          <gallery
            v-if="galleryUrls"
            :images="galleryUrls"
            :index="galleryIndex"
            @close="galleryIndex = null">
          </gallery>

          <div
            v-for="(image, imageIndex) in item.gallery"
            :key="imageIndex"
            :contentAware="false"
            class="gallery-image"
            @click="galleryIndex = imageIndex">

          <responsive-image :src="image"/>

          </div>
        </div>

        <!-- <div
          v-for="(day, index) in journey"
          :key="index"
          v-if="day.slug==$route.params.day">

          https://firebasestorage.googleapis.com/v0/b/iceland-book.appspot.com/o/flamelink%2Fmedia%2F1532939659560_iceland-160726-8.jpg

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

          <page-control
            :current="Number(day.index)"
            :journey="journey"></page-control>
        </div> -->
      </main>
    </div>
  </div>
</template>

<script>
import app from '@/firebase.js'
import VueMarkdown from 'vue-markdown'
import Gallery from 'vue-gallery'
import PageControl from '@/components/PageControl.vue'
import Image from '@/components/Image.vue'

export default {
  name: 'day',
  data () {
    return {
      previousPage: null,
      currentPage: null,
      nextPage: null,
      previous: {},
      current: {},
      next: {},
      all: [],
      galleryIndex: null,
      galleryUrls: []
    }
  },
  methods: {
    getBody() {
      app.content.getByField('days', 'tripIndex', this.currentPage, {
        populate: [{ field: 'coverImage' }, { field: 'gallery' }]
      })
        .then(days => this.current = days)
        .then(days => this.setGalleryUrls(days))
        .catch(error => console.error('something went wrong while retrieving the current day:', error))
    },
    getAll() {
      app.content.get('days', { fields: [ 'id' ]})
        .then(days => this.all = days)
        .catch(error => console.error('something went wrong while retrieving all entries:', error))
    },
    setActive() {
      let currentPage = parseInt(this.$route.params.day)
      let previousPage = currentPage - 1
      let nextPage = currentPage + 1
      
      // check, if the previous post is valid (true if it's at least 1)
      if (previousPage >= 1) {
        this.previousPage = previousPage
      }

      // check, if the next post is valid (true if it's at maximum as many, as there are posts)
      if (nextPage <= this.all.length) {
        this.nextPage = nextPage
      }

      this.currentPage = currentPage
    },
    getPrevious() {
      if(this.previousPage != null) {
        app.getByField('days', 'tripIndex', this.previousPage)
          .then(days => this.previous = days)
          .catch(error => console.log(error))
      }
    },
    setGalleryUrls(gallery) {
      let images = gallery[Object.keys(gallery)[0]].gallery
      let i
      for(i = 0; i < images.length; i++) {
        this.galleryUrls.push(images[i].url)
      }
    }
  },
  created () {
    this.getBody(),
    this.getAll(),
    this.setActive(),
    this.getPrevious()
  },
  components: {
    VueMarkdown,
    'gallery': Gallery,
    'page-control': PageControl,
    'responsive-image': Image
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.background-image {
  background-position: center;
  background-size: cover;
  padding-top: 100%;
  width: 100%;
}

main {
  margin: -80px 10px 0 10px;
  position: relative;
  z-index: 1;
}

h1 {
  color: #ffffff;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  margin: 0 16px 0.5em 16px;
  font-size: 1.75em;
}

.card {
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 3px 4px rgba(0,0,0,0.1), 0 3px 11px rgba(0,0,0,0.05);
  
  box-sizing: border-box;
  font-family: 'Merriweather', serif;
  padding: 16px;
  margin-bottom: 10px;
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

.gallery-image {
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
