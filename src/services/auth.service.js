import CucHttpService from './Cuc.Http.service'
import common from './common.service'

let cucHttp = new CucHttpService('conteumconto', null)

export default {
  user: {
    authenticated: false
  },

  login (context, creds) {
    return cucHttp.login(creds)
      .then(response => {
        console.log(response)
        // Checks if user's token is present
        if (!common.isEmpty(response.headers.authorization)) {
          localStorage.setItem('token', response.headers.authorization)
          this.user.authenticated = true
          return response.data
        } else throw new Error('invalid_login_password')
      })
  },

  signup (context, user, userType) {
    return cucHttp
      .signup(user, {userType})
      .then(response => response)
  },

  logout () {
    // Clears the localStorage, removing student's data and token
    localStorage.clear()
    this.user.authenticated = false
  },

  checkAuth () {
    const jwt = localStorage.getItem('token')
    if (jwt) this.user.authenticated = true
    else this.user.authenticated = false
  },

  // Returns the object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      Authorization: localStorage.getItem('token')
    }
  }
}
