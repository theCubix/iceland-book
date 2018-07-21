import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Journey from './views/Journey.vue'
import Downloads from './views/Downloads.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/journey',
      name: 'journey',
      component: Journey
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: Downloads
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
