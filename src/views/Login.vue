<template>
  <div>
    <h1>Welcome to the {{ greeting }}-Page!</h1>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      greeting: 'Login'
    }
  }
}
</script>
