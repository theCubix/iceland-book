<template>

  <div class="wrapper">

    <router-link
      class="trigger"
      v-if="isPrev"
      :to="'/journey/'+journey[savePrev].slug"
      :style="{
        'background-image': 'linear-gradient(to bottom right, rgba(50,243,255,0.75), rgba(35,170,178,0.75)), url('+journey[savePrev].cover+')'
      }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--previous">
            <span class="secondary-text">Vorheriger Tag</span>
            <span class="primary-text">{{ journey[savePrev].title }}</span>
          </div>
          <left-icon class="icon icon--previous"></left-icon>
        </div>
      </router-link>

      <router-link
        class="trigger"
        v-if="isNext"
        :to="'/journey/'+journey[saveNext].slug"
        :style="{
          'background-image': 'linear-gradient(to bottom right, rgba(255,148,50,0.75), rgba(178,104,35,0.75)), url('+journey[saveNext].cover+')'
        }">
        <div class="justify-wrapper">
          <div class="text-wrapper text-wrapper--next">
            <span class="secondary-text secondary-text--next">Nächster Tag</span>
            <span class="primary-text primary-text--next">{{ journey[saveNext].title }}</span>
          </div>
          <right-icon class="icon icon--next"></right-icon>
        </div>
      </router-link>

  </div>

</template>

<script>
import RightIcon from '@/assets/cheveron-right.svg'
import LeftIcon from '@/assets/cheveron-left.svg'

export default {
  props: {
    current: Number,
    journey: Array
  },
  data () {
    return {
      next: this.current+1,
      saveNext: Math.min(this.journey.length, Math.max(0, this.current+1)),
      prev: this.current-1,
      savePrev: Math.min(this.journey.length, Math.max(0, this.current-1))
    }
  },
  computed: {
    isPrev() {
      if(this.prev>=0) {
        return(true)
      }
      else
      {
        return(false)
      }
    },
    isNext() {
      if(this.next<this.journey.length) {
        return(true)
      }
      else
      {
        return(false)
      }
    }
  },
  components: {
    'right-icon': RightIcon,
    'left-icon': LeftIcon
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
