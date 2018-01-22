import VueRouter from 'vue-router'
import { routes } from '../config/routes.config'

export const router = new VueRouter({
  routes,
  mode: 'history'
})
