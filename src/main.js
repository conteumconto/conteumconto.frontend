import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './store/index'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueSweetAlert from 'vue-sweetalert'

import Home from './components/home/main'
import Painel from './components/home/painel'
import Signup from './components/signup/root.signup'
import BookCase from './components/bookcase/main.vue'
import EditProfile from './components/editProfile/editProfile'
import Login from './components/login/login'
import Write from './components/write/write.vue'
import Auth from './auth/index'

Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSweetAlert)

Vue.http.headers.common['Authorization'] = localStorage.getItem('token')
Auth.checkAuth()

const routes = [
  {path: '/home', alias: '/', component: Home, meta: {requiresAuth: true}},
  {path: '/painel', alias: '/painelDoProfessor', component: Painel, meta: {requiresAuth: true}},
  {path: '/books', alias: '/meusLivros', component: BookCase, meta: {requiresAuth: true}},
  { path: '/editProfile', alias: '/editarPerfil', component: EditProfile, meta: {requiresAuth: true} },
  { path: '/signup', alias: '/cadastrar', component: Signup },
  { path: '/login', alias: '/entrar', name: 'login', component: Login },
  { path: '/write', alias: '/escrever', component: Write, meta: {requiresAuth: true} },
  { path: '/write/new/:book_id/', alias: '/escrever/novo/:book_id/', component: Write, meta: {requiresAuth: true} },
  { path: '/write/new/:chapter_id/', alias: '/escrever/editar/:chapter_id/', component: Write, meta: {requiresAuth: true} }
]
// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token') == null || localStorage.getItem('student') === 'undefined') {
      next({name: 'login'})
      Auth.logout()
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
