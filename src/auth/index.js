import globalConfig from '../services/GlobalConfigs'

const API_URL = globalConfig.getApiURL()

export default {

  user: {
    authenticated: false
  },

  login (context, creds) {
    const LOGIN_URL = API_URL + '/auth/'

    context.$http.post(LOGIN_URL, creds).then(({body}) => {
      // Checks if user's token is present
      if (typeof body.token !== 'undefined') {
        let userType = body.person.__t
        // Stores student's data and token in the localStorage
        localStorage.setItem('token', body.token)
        localStorage.setItem(userType, JSON.stringify(body.person))
        this.user.authenticated = true
        context.$store.commit('LOAD_STUDENT_DATA', body.person)
        if (userType === 'Student') {
          context.$router.push('/')
        } else if (userType === 'Teacher') {
          context.$router.push('/painel')
        }
      } else {
        // Returns a login error message to show to the user
        // TODO: DESACOPLAR O SNACK BAR EO ALGORITMO DE LOGIN
        context.openSnackBar('Usuário ou Senha Incorretos')
        context.isDanger = true
      }
    }, error => {
      context.error = error
    })
  },

  signup (context, user, userType) {
    // Concatenate API URL and /user
    const SIGNUP_URL = API_URL + userType
    context.$http.post(SIGNUP_URL, user).then(response => {
      if (response.statusText === 'Created') {
        context.openSnackBar('Cadastro realizado com sucesso!')
        setTimeout(function () { context.$router.push('/entrar') }, 2000)
      }
    }, err => {
      context.error = err
      // Returns a signup error message to show to the user
      if (err.body.error === 'Duplicate email') {
        context.openSnackBar('Email já cadastrado!')
      } else if (err.body.error === 'Duplicate login') {
        context.openSnackBar('O Login escolhido já está em Uso!')
      }
      console.log(err)
    })
  },
  logout () {
    // Clears the localStorage, removing student's data and token
    localStorage.removeItem('token')
    localStorage.removeItem('Student')
    this.user.authenticated = false
    location.href = '#/entrar'
  },
  checkAuth () {
    var jwt = localStorage.getItem('token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },
  // Returns the object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      Authorization: localStorage.getItem('token')
    }
  }
}
