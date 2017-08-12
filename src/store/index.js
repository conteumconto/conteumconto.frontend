import Vue from 'vue'
import Vuex from 'vuex'
import books from './modules/books'
import student from './modules/student'
import teacher from './modules/teacher'
import classgroup from './modules/classgroup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    books,
    student,
    teacher,
    classgroup
  }
})
