<template>
  <div id="app">
    <component :is="layout">
      <transition name="fade">
        <router-view/>
      </transition>
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      return (this.$route.meta.layout + '-layout')
    }
  }
}
</script>

<style lang="scss">
@import './scss/variables';

body {
  background-color: $blue-light;
  font-size: 16px;
  margin: 0;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
