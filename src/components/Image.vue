<template>
  <div :class="`${contentAware ? 'wrapper' : ''}`">
    <picture v-if="sizes != null" :class="`${contentAware ? 'child' : ''}`">
      <source
        v-for="(size, index) in sizes"
        :key="index"
        :media="`(min-width: ${src.sizes[index].width}px)`"
        :srcset="sizes[index]">
      <img :src="`${sizes[0]}`" />
    </picture>
  </div>
</template>

<script>
import { firebaseApp as firebase } from '@/firebase.js'

export default {
  props: {
    src: Object,
    contentAware: Boolean
  },
  data () {
    return {
      img: this.src,
      sizes: []
    }
  },
  methods: {
    getDownloadUrl (src) {
      var i
      for (i = 0; i < src.sizes.length; i++) {
      firebase.storage().ref(`flamelink/media/sized/${src.sizes[i].path}/${src.file}`).getDownloadURL()
          .then(url => this.sizes.push(url))
          .catch(err => console.log(err))
      }
    }
  },
  created () {
    this.getDownloadUrl(this.img)
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

div {
  background-color: $blue-primary;
  width: 100%;
  position: relative;
}

.wrapper {
  padding-top: 56.25%;
}

picture {

  width: 100%;

  & > img {
    display: block;
    width: 100%;
  }
}

.child {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
