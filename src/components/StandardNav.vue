<template>
  <div>
    <nav>
      <router-link to="/">
        <div>
          <home-icon class="icon" />
          <span>Home</span>
        </div>
      </router-link>
      <router-link to="/journey">
        <div>
          <journal-icon class="icon" />
          <span>Journey</span>
        </div>
      </router-link>
      <router-link to="/downloads">
        <div>
          <download-icon class="icon" />
          <span>Downloads</span>
        </div>
      </router-link>
    </nav>
  </div>
</template>

<script>
import HomeIcon from '@/assets/home.svg'
import JournalIcon from '@/assets/journal.svg'
import DownloadIcon from '@/assets/download.svg'

export default {
  name: 'StandardNav',
  components: {
    'home-icon': HomeIcon,
    'journal-icon': JournalIcon,
    'download-icon': DownloadIcon
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables';

nav {
  right: 0;
  bottom: 0;
  left: 0;

  background-color: $blue-primary;
  display: flex;
  height: 64px;
  position: fixed;
  width: 100%;
}

a {
  align-items: center;
  color: $blue-dark;
  display: flex;
  font-family: 'Source Sans Pro', sans-serif;
  justify-content: center;
  width: 33.3%;
  text-align: center;
  text-decoration: none;
}

span {
  opacity: 0;
  transition: opacity 300ms ease;
}

a.router-link-exact-active {
  color: #000000;
  & svg.icon {
    fill: #000000;
    margin-bottom: 0;
  }
  & span {
    opacity: 1;
  }
}

svg.icon {
  display: block;
  fill: $blue-dark;
  height: 20px;
  margin-bottom: -1em;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  transition: all 300ms ease;
  transition-property: fill, margin-bottom;
}
</style>

