import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VueMoment from 'vue-moment'
import router from './router'
import './registerServiceWorker'

import LoggedIn from '@/layouts/LoggedIn'
import NotLoggedIn from '@/layouts/NotLoggedIn.vue'

Vue.component('logged-in-layout', LoggedIn)
Vue.component('not-logged-in-layout', NotLoggedIn)

Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(VueMoment)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
