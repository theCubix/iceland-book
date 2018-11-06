<template>
    <div :class="`${contentAware ? 'wrapper' : '' }`">
      <img
        v-if="sizes != null"
        :src="sizes[0]"
        :class="`${contentAware ? 'child' : ''}`"
        :srcset="`${sizes.map((size, index) => `${size} ${src.sizes[index].width}w, `)}`">
    </div>
</template>

<script>
import app from '@/firebase.js'

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
      // console.log(src)
      Promise.all(src.sizes.map(size => app.storage.getURL(src.id, { size })))
        .then(res => {
          this.sizes = res
        })
        .catch(err => console.log(error))
    }
  },
  created () {
    this.getDownloadUrl(this.img)
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

.progressive {
  width: 100%;
}

.preview {
  width: 100%;
}

div {
  background-color: $blue-primary;
  width: 100%;
  position: relative;
}

.wrapper {
  overflow: hidden;
  @include phone {
    padding-top: 56.25%;
  }
  @include tablet {
    padding-top: 40%;
  }
  @include desktop {
    padding-top: 40%;
  }
}

img {
  display: block;
  width: 100%;
}

.child {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  object-fit: cover;
}
</style>
