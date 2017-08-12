import Vue from 'vue'
import globalConfig from '../../services/GlobalConfigs'
import Auth from '../../auth/index'

const API_URL = globalConfig.getApiURL()

// state
const state = {
  student: []
}
// getters
const getters = {
  dataStudent: function (state) {
    if (localStorage.getItem('Student') !== 'undefined') {
      state.student = JSON.parse(localStorage.getItem('Student'))
    }
    return state.student
  }
}

// actions
const actions = {
  loadStudentDataFromApi: ({commit}, login) => {
    // fetching the api and retrive student`s data
    Vue.http.get(API_URL + '/student/' + login,
      {
        headers: Auth.getAuthHeader()
      }
    ).then(response => {
      commit('LOAD_STUDENT_DATA', response.body)
      // }
    }, (error) => {
      if (error.body === 'Unauthorized') {
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
