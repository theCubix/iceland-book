<template>
  <div>
    <app-nav></app-nav>
    <slot/>
  </div>
</template>

<script>
import Nav from '@/components/StandardNav.vue'

export default {
  name: 'LoggedIn',
  components: {
    'app-nav': Nav
  }
}
</script>

<style lang="scss" scoped>
</style>
