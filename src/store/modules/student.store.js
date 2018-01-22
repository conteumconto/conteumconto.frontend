import Auth from '../../services/auth.service'
import CucHttpService from '../../services/Cuc.Http.service'

let cucHttp = new CucHttpService('conteumconto', Auth.getAuthHeader())

// state
const state = {
  student: []
}

// getters
const getters = {
  dataStudent (state) {
    if (localStorage.getItem('Student') !== 'undefined') {
      state.student = JSON.parse(localStorage.getItem('Student'))
    }
    return state.student
  }
}

// actions
const actions = {
  /**
   * Fetching the api and retrive student's data
   * @param {Object} commit
   * @param {String} login
   */
  loadStudentDataFromApi ({commit}, login) {
    cucHttp.setAuthHeaders(localStorage.getItem('token'))
    cucHttp.getStudent({login})
      .then(response => commit('LOAD_STUDENT_DATA', response.body))
      .catch(err => {
        console.error(err)
        if (err.body === 'Unauthorized') {
          Auth.logout()
        }
      })
  }
}

const mutations = {
  LOAD_STUDENT_DATA (state, student) {
    localStorage.setItem('Student', JSON.stringify(student))
    state.student = student
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
