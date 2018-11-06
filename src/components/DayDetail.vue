<template>
  <div>

    <div v-for="(item, index) in current" :key="index">

      <responsive-image
        :src="item.coverImage[0]"
        :contentAware="true" />

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

          <h2>Bilder</h2>

          <div class="masonry">

            <div
              v-for="(image, imageIndex) in item.gallery"
              :key="imageIndex"
              :contentAware="false"
              class="gallery-image"
              @click="galleryIndex = imageIndex">
                <responsive-image :src="image"/>
            </div>

          </div>

        </div>

      </main>
    </div>
  </div>
</template>

<script>
import app from '@/firebase.js'
import VueMarkdown from 'vue-markdown'
import Image from '@/components/Image.vue'
import Gallery from 'vue-gallery'

export default {
  name: 'day',
  data () {
    return {
      current: {},
      galleryIndex: null,
      galleryUrls: []
    }
  },
  methods: {
    getBody () {
      app.content.getByField('days', 'tripIndex', Number(this.$route.params.day),
        {
          populate: [
            { field: 'coverImage' },
            { field: 'gallery' }]
        })
        .then(days => (this.current = days))
        .then(days => this.setGalleryUrls(days))
        .catch(error => console.error('something went wrong while retrieving the current day:', error))
    },
    setGalleryUrls (gallery) {
      this.galleryUrls = []
      let images = gallery[Object.keys(gallery)[0]].gallery
      let i
      for (i = 0; i < images.length; i++) {
        this.galleryUrls.push(images[i].url)
      }
    }
  },
  created () {
    this.getBody()
  },
  components: {
    VueMarkdown,
    'gallery': Gallery,
    'responsive-image': Image
  },
  watch: {
    $route (to, from) {
      this.getBody()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

main {
  margin-top: -80px;
  position: relative;
  z-index: 1;

  @include desktop {
    margin-top: -180px;
  }
}

h1 {
  color: #ffffff;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  margin: 0 16px 0.5em 16px;
  font-size: 1.75em;

  @include desktop {
    box-sizing: border-box;
    display: block;
    font-size: 3em;
    margin: 0 auto 0.5em auto;
    padding: 0 100px;
    width: 980px;
  }
}

h2 {
  color: #197980;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  font-size: 1.5em;

  @include desktop {
    opacity: 0.4;
    font-size: 2em;
  }
}

.card {
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: 0 3px 4px rgba(0,0,0,0.1), 0 3px 11px rgba(0,0,0,0.05);

  box-sizing: border-box;
  font-family: 'Merriweather', serif;
  padding: 16px;
  margin: 0 10px 20px 10px;

  @include desktop {
    margin: 0 auto 140px auto;
    padding: 75px 100px;
    width: 980px;
  }
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

@supports (column-count: 1) {
  .masonry {
    @include tablet {
      column-count: 2;
    }

    @include desktop {
      column-count: 2;
    }
  }
}

.gallery-image {
  border-radius: 3px;
  display: block;
  margin-bottom: 16px;
  overflow: hidden;
  width: 100%;

  & > * {
    transform: scale(1.1);
    transition: transform 300ms ease;
  }

  &:hover > * {
    transform: scale(1);
  }
}
</style>

<style lang="scss">
.body-text {
  margin-bottom: 100px;

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
