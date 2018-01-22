import InjectChapters from '../../services/Chapter.service'
import Auth from '../../services/auth.service'
import CucHttpService from '../../services/Cuc.Http.service'
import common from '../../services/common.service'

let cucHttp = new CucHttpService('conteumconto', Auth.getAuthHeader())

// state
const state = {
  books: [],
  haveBooks: true
}

// getters
const getters = {
  studentBooks (state) {
    return state.books
  },
  haveBooks (state) {
    return state.haveBooks
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
          commit('LOAD_BOOKS', InjectChapters.resolve(response))
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
      else commit('HAVE_BOOKS')
    } else {
      Auth.logout()
      this.$router.push({name: 'login'})
    }
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
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
