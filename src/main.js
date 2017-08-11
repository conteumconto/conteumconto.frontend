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
import TeacherHome from './components/home/main.teacher'
import Signup from './components/signup/root.signup'
import BookCase from './components/bookcase/main.vue'
import EditProfile from './components/editProfile/editProfile'
import Login from './components/login/login'
import Write from './components/write/write.vue'
import Auth from './auth/index'

import common from './services/CommonServices'

Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSweetAlert)

Vue.http.headers.common['Authorization'] = localStorage.getItem('token')

const routes = [
  { path: '/home', alias: '/', component: Home, meta: {requiresStudentAuth: true} },
  { path: '/painel', alias: '/painelDoProfessor', component: TeacherHome, meta: {requiresTeacherAuth: true} },
  { path: '/books', alias: '/meusLivros', component: BookCase, meta: {requiresStudentAuth: true} },
  { path: '/editProfile', alias: '/editarPerfil', component: EditProfile, meta: {requiresStudentAuth: true} },
  { path: '/signup', alias: '/cadastrar', component: Signup },
  { path: '/login', alias: '/entrar', name: 'login', component: Login },
  { path: '/write', alias: '/escrever', component: Write, meta: {requiresStudentAuth: true} },
  { path: '/write/new/:book_id/', alias: '/escrever/novo/:book_id/', component: Write, meta: {requiresStudentAuth: true} },
  { path: '/write/new/:chapter_id/', alias: '/escrever/editar/:chapter_id/', component: Write, meta: {requiresStudentAuth: true} }
]
// Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // Verify if it's a protected route
  if (to.meta.requiresStudentAuth || to.meta.requiresTeacherAuth) {
    // Checks if a token and the actor of the protected route is present in the localStorage
    if (!common.isEmpty(localStorage.getItem('token')) &&
       (to.meta.requiresStudentAuth && !common.isEmpty(localStorage.getItem('Student'))) ||
       (to.meta.requiresTeacherAuth && !common.isEmpty(localStorage.getItem('Teacher')))) {
      next()
    } else {
      next({name: 'login'})
      Auth.logout()
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
