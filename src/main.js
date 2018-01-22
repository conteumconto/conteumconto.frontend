import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './store/main.store'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import VueSweetAlert from 'vue-sweetalert'

import { router } from './services/router.service'
import Auth from './services/auth.service'
import common from './services/common.service'

Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSweetAlert)

Auth.checkAuth()

router.beforeEach((to, from, next) => {
  if (common.isEmptyArray(to.matched)) next({name: 'login'})
  else if (to.meta.requiresAuth) {
    if (localStorage.getItem('token') == null || localStorage.getItem('student') === 'undefined') {
      next({name: 'login'})
      Auth.logout()
      this.$router.push({name: 'login'})
    } else {
      next()
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
