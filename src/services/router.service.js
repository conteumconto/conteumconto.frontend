import VueRouter from 'vue-router'
import { routes } from '../config/routes.config'

export default new VueRouter({
  routes,
  mode: 'history'
})
