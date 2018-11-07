<template>

  <div class="wrapper">
    <router-link
      class="trigger"
      v-if="showPrev"
      :to="`/day/${active-1}`"
      :style="{
        'background-image':
        `linear-gradient(to bottom right, rgba(50,243,255,0.75),
        rgba(35,170,178,0.75)),
        url('${objectImages[entries[Object.keys(entries)[active - 2]].coverImage[0].id][2]}')`
      }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--previous">
            <span class="secondary-text">Vorheriger Tag</span>
            <span class="primary-text">
              {{ entries[Object.keys(entries)[active - 2]].title }}
            </span>
          </div>
          <left-icon class="icon icon--previous"></left-icon>
        </div>
    </router-link>

    <router-link
      class="trigger"
      v-if="showNext"
      :to="`/day/${active+1}`"
      :style="{
          'background-image':
          `linear-gradient(to bottom right,
          rgba(255,148,50,0.75),
          rgba(178,104,35,0.75)),
          url('${objectImages[entries[Object.keys(entries)[active]].coverImage[0].id][2]}')`
        }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--next">
            <span class="secondary-text secondary-text--next">Nächster Tag</span>
            <span class="primary-text primary-text--next">{{ entries[Object.keys(entries)[active]].title }}</span>
          </div>
          <right-icon class="icon icon--next"></right-icon>
        </div>
      </router-link>

  </div>

</template>

<script>
import RightIcon from '@/assets/cheveron-right.svg'
import LeftIcon from '@/assets/cheveron-left.svg'

import app from '@/firebase.js'

export default {
  name: 'PageControl',
  props: {
    active: Number
  },
  data () {
    return {
      showPrev: false,
      showNext: false,
      entries: {},
      entriesImages: [],
      objectImages: {},
      entriesTotal: null,
      previousEntry: 0,
      nextEntry: 0
    }
  },
  components: {
    'right-icon': RightIcon,
    'left-icon': LeftIcon
  },
  methods: {
    fetchAll () {
      app.content.get('days', {
        fields: [
          'id',
          'coverImage',
          'title'
        ],
        populate: [{ field: 'coverImage' }]
      })
        .then(res => {
          this.entriesTotal = Object.keys(res).length
          this.entries = res
          this.fetchImages(res)
          this.setPrev()
          this.setNext()
        })
        .catch(err => console.log(err))
    },
    fetchImages (entries) {
      Object.keys(entries).map((key, index) => {
        let image = entries[key].coverImage[0]
        let sizes = image.sizes
        Promise.all(sizes.map(size => app.storage.getURL(image.id, {size})))
          .then(res => {
            this.entriesImages.push(res)
            this.objectImages[image.id] = res
            // console.log(image.id)
          })
          .catch(err => console.log(err))
      })
    },
    setPrev () {
      let previous = this.active - 1
      if (previous >= 1) {
        this.showPrev = true
      } else {
        this.showPrev = false
      }
    },
    setNext () {
      let next = this.active + 1
      if (next <= this.entriesTotal) {
        this.showNext = true
      } else {
        this.showNext = false
      }
    }
  },
  mounted () {
    this.fetchAll()
  },
  watch: {
    $route (to, from) {
      this.setPrev()
      this.setNext()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.wrapper {
  margin-bottom: 64px;

  @include tablet {
    display: flex;
  }

  @include desktop {
    display: flex;
  }
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
