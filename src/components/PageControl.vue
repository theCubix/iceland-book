<template>

  <div class="wrapper">

    <router-link
      class="trigger"
      v-if="previous"
      :to="`/day/${previous}`"
      :style="{
        'background-image': `linear-gradient(to bottom right, rgba(50,243,255,0.75), rgba(35,170,178,0.75)), url('${previousImageUrl}')`
      }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--previous">
            <span class="secondary-text">Vorheriger Tag</span>
            <span class="primary-text">{{ previousPage.title }}</span>
          </div>
          <left-icon class="icon icon--previous"></left-icon>
        </div>
    </router-link>

    <router-link
      class="trigger"
      v-if="next"
      :to="`/day/${next}`"
      :style="{
          'background-image': `linear-gradient(to bottom right, rgba(255,148,50,0.75), rgba(178,104,35,0.75)), url('${nextImageUrl}')`
        }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--next">
            <span class="secondary-text secondary-text--next">Nächster Tag</span>
            <span class="primary-text primary-text--next">{{ nextPage.title }}</span>
          </div>
          <right-icon class="icon icon--next"></right-icon>
        </div>
      </router-link>

  </div>

</template>

<script>
import RightIcon from '@/assets/cheveron-right.svg'
import LeftIcon from '@/assets/cheveron-left.svg'

import app, { firebaseApp as firebase } from '@/firebase.js'

export default {
  name: 'PageControl',
  props: {
    previous: Number,
    next: Number
  },
  data () {
    return {
      previousPage: {},
      previousImageUrl: '',
      nextPage: {},
      nextImageUrl: ''
    }
  },
  components: {
    'right-icon': RightIcon,
    'left-icon': LeftIcon
  },
  methods: {
    fetchPrevious () {
      if (this.previous != null) {
        app.content.getByField('days', 'tripIndex', this.previous,
          {
            fields: [
              'title',
              'coverImage'
            ],
            populate: [{
              field: 'coverImage'
            }]
          })
          .then(res => (this.previousPage = res[Object.keys(res)[0]]))
          .then(res => this.setPreviousImageUrl())
          .catch(err => console.log(err))
      } else {
        this.previousPage = {}
        this.previousImageUrl = ''
      }
    },
    fetchNext () {
      if (this.next != null) {
        app.content.getByField('days', 'tripIndex', this.next,
          {
            fields: [
              'title',
              'coverImage'
            ],
            populate: [{
              field: 'coverImage'
            }]
          })
          .then(res => (this.nextPage = res[Object.keys(res)[0]]))
          .then(res => this.setNextImageUrl())
          .catch(err => console.log(err))
      } else {
        this.nextPage = {}
        this.nextImageUrl = ''
      }
    },
    setPreviousImageUrl () {
      var image = this.previousPage.coverImage[0]
      firebase.storage().ref(`flamelink/media/sized/${image.sizes[0].path}/${image.file}`).getDownloadURL()
        .then(url => (this.previousImageUrl = url))
        .catch(err => console.log(err))
    },
    setNextImageUrl () {
      var image = this.nextPage.coverImage[0]
      firebase.storage().ref(`flamelink/media/sized/${image.sizes[0].path}/${image.file}`).getDownloadURL()
        .then(url => (this.nextImageUrl = url))
        .catch(err => console.log(err))
    }
  },
  created () {
    this.fetchPrevious()
    this.fetchNext()
  },
  watch: {
    $route(to, from) {
      this.fetchPrevious()
      this.fetchNext()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.wrapper {
  margin-bottom: 64px;
}

.trigger {
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  width: 100%;
}

a {
  text-decoration: none;
}

.text-wrapper  {
  &--previous {
    margin-left: 60px;
  }
  &--next {
    margin-right: 60px;
  }
}

.justify-wrapper {
  position: relative;
}

.primary-text {
  color: #ffffff;
  display: block;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1.5em;
  font-weight: 700;

  &--next {
    text-align: right;
  }
}

.secondary-text {
  color: #ffffff;
  display: block;
  font-size: 0.875em;
  font-family: 'Source Sans Pro', sans-serif;
  opacity: 0.8;
  &--next {
    text-align: right;
  }
}

.icon {
  top: 4px;
  fill: #ffffff;
  height: 30px;
  position: absolute;
  width: 30px;

  &--previous {
    left: 10px;
  }

  &--next {
    right: 10px;
  }
}
</style>
