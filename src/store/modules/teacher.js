import Vue from 'vue'
import globalConfig from '../../services/GlobalConfigs'
import Auth from '../../auth/index'

const API_URL = globalConfig.getApiURL()

// state
const state = {
  teacher: []
}
// getters
const getters = {
  dataTeacher: function (state) {
    if (localStorage.getItem('Teacher') !== 'undefined') {
      state.teacher = JSON.parse(localStorage.getItem('Teacher'))
    }
    return state.teacher
  }
}

// actions
const actions = {
  loadTeacherDataFromApi: ({commit}, login) => {
    // fetching the api and retrive teacher`s data
    Vue.http.get(API_URL + '/teacher/' + login,
      {
        headers: Auth.getAuthHeader()
      }
    ).then(response => {
      commit('LOAD_TEACHER_DATA', response.body)
    }, (error) => {
      if (error.body === 'Unauthorized') {
        Auth.logout()
      }
    })
  }
}

const mutations = {
  LOAD_TEACHER_DATA (state, teacher) {
    localStorage.setItem('Teacher', JSON.stringify(teacher))
    state.teacher = teacher
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
