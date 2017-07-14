import Vue from 'vue'
import globalConfig from '../../services/GlobalConfigs'
import InjectChapters from '../../services/InjectChapters'
import Auth from '../../auth/index'

const API_URL = globalConfig.getApiURL()

// state
const state = {
  books: [],
  haveBooks: true
}

// getters
const getters = {
  studentBooks: function (state) {
    return state.books
  },
  haveBooks: function (state) {
    return state.haveBooks
  }
}

// actions
const actions = {
  loadBookDataFromApi ({commit}, userLogin) {
    // fetching the api and retrive book`s data
    // change to book endpoint
    Vue.http.get(API_URL + `/book/` + userLogin,
      {headers: Auth.getAuthHeader()}
    ).then(({body}) => {
      if (body.length === 0) {
        commit('NO_BOOKS')
      } else {
        commit('LOAD_BOOKS', InjectChapters.resolve(body))
        commit('HAVE_BOOKS')
      }
    },
    error => {
      if (error.body === 'Unauthorized') {
        Auth.logout()
      }
    })
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
