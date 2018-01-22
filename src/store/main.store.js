import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/book.store'
import student from './modules/student.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books,
    student
  }
})
