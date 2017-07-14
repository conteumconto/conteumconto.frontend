import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import student from './modules/student'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books,
    student
  }
})
