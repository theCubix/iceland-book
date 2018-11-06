<template>

  <div class="wrapper">
    <router-link
      class="trigger"
      v-if="previousEntry != null"
      :to="`/day/${previousEntry}`"
      :style="{
        'background-image':
        `linear-gradient(to bottom right, rgba(50,243,255,0.75),
        rgba(35,170,178,0.75)),
        url('${entriesImages[previousEntry - 1][2]}')`
      }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--previous">
            <span class="secondary-text">Vorheriger Tag</span>
            <span class="primary-text">
              {{ entries[Object.keys(entries)[previousEntry - 1]].title }}
            </span>
          </div>
          <left-icon class="icon icon--previous"></left-icon>
        </div>
    </router-link>

    <router-link
      class="trigger"
      v-if="nextEntry != null"
      :to="`/day/${nextEntry}`"
      :style="{
          'background-image':
          `linear-gradient(to bottom right,
          rgba(255,148,50,0.75),
          rgba(178,104,35,0.75)),
          url('${entriesImages[nextEntry - 1][2]}')`
        }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--next">
            <span class="secondary-text secondary-text--next">Nächster Tag</span>
            <span class="primary-text primary-text--next">{{ entries[Object.keys(entries)[nextEntry - 1]].title }}</span>
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
      entries: {},
      entriesImages: [],
      entriesTotal: null,
      previousEntry: null,
      nextEntry: null
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
          })
          .catch(err => console.log(err))
      })
    },
    setPrev () {
      let previous = this.active - 1
      if (previous >= 1) {
        this.previousEntry = previous
      } else {
        this.previousEntry = null
      }
    },
    setNext () {
      let next = this.active + 1
      if (next <= this.entriesTotal) {
        this.nextEntry = next
      } else {
        this.nextEntry = null
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
