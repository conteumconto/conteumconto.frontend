import ChapterService from '../../services/Chapter.service'
import Auth from '../../services/auth.service'
import CucHttpService from '../../services/Cuc.Http.service'
import common from '../../services/common.service'

let cucHttp = new CucHttpService('conteumconto', Auth.getAuthHeader())

// state
const state = {
  books: [],
  haveBooks: true,
  actualBook: null
}

// getters
const getters = {
  studentBooks (state) {
    return state.books
  },
  haveBooks (state) {
    return state.haveBooks
  },
  actualBook () {
    return state.actualBook
  }
}

// actions
const actions = {
  /**
   * Fetching the api and retrive book's data, changing to book endpoint
   * @param {Object} commit
   * @param {String} userLogin
   */
  loadBookDataFromApi ({commit}, userLogin) {
    cucHttp.setAuthHeaders(localStorage.getItem('token'))
    cucHttp.getStudentBooks({userLogin})
      .then(response => {
        if (response.length === 0) {
          commit('NO_BOOKS')
        } else {
          commit('LOAD_BOOKS', ChapterService.resolve(response))
          commit('HAVE_BOOKS')
        }
      })
      .catch(err => {
        console.error(err)
        if (err.body === 'Unauthorized') {
          Auth.logout()
          this.$router.push({name: 'login'})
        }
      })
  },

  loadBookDataFromUser ({commit}) {
    let student = JSON.parse(localStorage.getItem('Student'))
    if (!common.isEmpty(student)) {
      if (common.isEmptyArray(student.books)) commit('NO_BOOKS')
      else {
        commit('LOAD_BOOKS', student.books)
        commit('HAVE_BOOKS')
      }
    } else {
      Auth.logout()
      this.$router.push({name: 'login'})
    }
  },

  storeNewBookData ({commit}, newBook) {
    let student = JSON.parse(localStorage.getItem('Student'))
    if (!common.isEmpty(student)) {
      if (common.isEmpty(student.books)) student.books = []
      student.books.push(newBook)
      localStorage.setItem('Student', JSON.stringify(student))
      commit('LOAD_BOOKS', student.books)
      commit('HAVE_BOOKS')
    } else {
      Auth.logout()
      this.$router.push({name: 'login'})
    }
  },

  storeNewChapterData ({commit}, newChapter) {
    let student = JSON.parse(localStorage.getItem('Student'))
    if (!common.isEmpty(student)) {
      if (common.isEmpty(student.books)) throw new Error('student_books_not_found')
      else {
        student.books = ChapterService.addChapter(student.books, newChapter)
        localStorage.setItem('Student', JSON.stringify(student))
        commit('LOAD_BOOKS', student.books)
        commit('HAVE_BOOKS')
      }
    } else {
      Auth.logout()
      this.$router.push({name: 'login'})
    }
  },

  updateChapterData ({commit}, updatedChapter) {
    let student = JSON.parse(localStorage.getItem('Student'))
    if (!common.isEmpty(student)) {
      if (common.isEmpty(student.books)) throw new Error('student_books_not_found')
      else {
        student.books = ChapterService.updateChapter(student.books, updatedChapter)
        localStorage.setItem('Student', JSON.stringify(student))
        commit('LOAD_BOOKS', student.books)
        commit('HAVE_BOOKS')
      }
    } else {
      Auth.logout()
      this.$router.push({name: 'login'})
    }
  },

  updateBookData ({commit}, updatedBook) {
    let student = JSON.parse(localStorage.getItem('Student'))
    if (!common.isEmpty(student)) {
      if (common.isEmpty(student.books)) throw new Error('student_books_not_found')
      else {
        if (updatedBook.deleted) student.books = student.books.filter(book => book._id !== updatedBook._id)
        else {
          student.books = student.books.map(book => {
            if (book._id === updatedBook._id) {
              const chapters = JSON.parse(JSON.stringify(book.chapters))
              book = updatedBook
              book.chapters = chapters
            }
            return book
          })
        }
        localStorage.setItem('Student', JSON.stringify(student))
        if (common.isEmptyArray(student.books)) commit('NO_BOOKS')
        else {
          commit('LOAD_BOOKS', student.books)
          commit('HAVE_BOOKS')
        }
      }
    } else {
      Auth.logout()
      this.$router.push({name: 'login'})
    }
  },

  setActualBook ({commit}, bookId) {
    commit('ACTUAL_BOOK', bookId)
  }
}

// mutations
const mutations = {
  LOAD_BOOKS (state, books) {
    state.books = books
  },
  NO_BOOKS (state) {
    state.haveBooks = false
  },
  HAVE_BOOKS (STATE) {
    state.haveBooks = true
  },
  ACTUAL_BOOK (state, bookId) {
    state.actualBook = bookId
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
