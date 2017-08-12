import Vue from 'vue'
import globalConfig from '../../services/GlobalConfigs'
import Auth from '../../auth/index'

const API_URL = globalConfig.getApiURL()

// state
const state = {
  classGroup: [],
  haveClassGroup: false
}

// getters
const getters = {
  dataClassGroup: function (state) {
    return state.classGroup
  },
  haveClassGroup: function (state) {
    return state.haveClassGroup
  }
}

// actions
const actions = {
  // load all the classgroups of a teacher
  loadClassGroupsFromApi ({commit}, teacherId) {
    // fetching the API and retrive book`s data
    // change to book endpoint
    Vue.http.get(API_URL + `/classgroup/` + teacherId,
      {headers: Auth.getAuthHeader()}
    ).then(({body}) => {
      if (body.length === 0) {
        commit('NO_ClassGroup')
      } else {
        commit('LOAD_ClassGroup', body)
        commit('HAVE_ClassGroup')
      }
    },
    error => {
      if (error.body === 'Unauthorized') {
        Auth.logout()
      }
    })
  },

  // load a classgroup searching by class ID
  loadClassGroupFromApi ({commit}, classId) {
    // fetching the API and retrive book`s data
    // change to book endpoint
    Vue.http.get(API_URL + `/classgroup/id/` + classId,
      {headers: Auth.getAuthHeader()}
    ).then(({body}) => {
      if (body.length === 0) {
        commit('NO_ClassGroup')
      } else {
        commit('LOAD_ClassGroup', body)
        commit('HAVE_ClassGroup')
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
  LOAD_ClassGroup (state, classGroup) {
    state.classGroup = classGroup
  },
  NO_ClassGroup (state) {
    state.haveClassGroup = false
  },
  HAVE_ClassGroup (state) {
    state.haveClassGroup = true
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
