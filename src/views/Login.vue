<template>
  <div>
    <h1>Welcome to the {{ greeting }}-Page!</h1>
  </div>
</template>

<script>
import app from '@/firebase.js'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'login',
  data () {
    return {
      greeting: 'Login'
    }
  },
  components: {
    VueMarkdown
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 320px;
}
</style>
