import HttpService from './Http.service'
import Auth from './auth.service'

export default class CucHttpService extends HttpService {

  constructor (api, headers) {
    super(api, headers)
    this._client.interceptors.response
      .use(
        response => {
          return Promise.resolve(response)
        },
        err => {
          if (err.response.data === 'Unauthorized') {
            Auth.logout()
            window.location.href = '/login?expired=true'
          } else return Promise.reject(err)
        }
      )
  }

  // *************** AUTHENTICATION ENDPOINTS *************** //

  login (creds) {
    return this._client.post('/auth/login', creds)
  }
  signup (body, params) {
    return this._client.post(`/auth/signup/${params.userType}`, body)
  }

  // ****************** STUDENT ENDPOINTS ******************* //

  editStudentProfile (body, params) {
    return this._client.put(`/student/${params.login}`, body)
  }
  deleteStudentProfile (params) {
    return this._client.delete(`/student/login/${params.login}`)
  }
  getStudent (params) {
    return this._client.get(`/student/${params.login}`)
  }

  // ****************** TEACHER ENDPOINTS ****************** //

  // @todo: Get teacher
  // @todo: Edit teacher
  // @todo: Delete teacher

  // ******************* BOOK ENDPOINTS ******************* //

  newBook (body) {
    return this._client.post('/book', body)
  }
  editBook (body, params) {
    return this._client.put(`/book/${params.bookId}`, body)
  }
  deleteBook (params) {
    return this._client.delete(`/book/${params.bookId}`)
  }
  getStudentBooks (params) {
    return this._client.get(`/book/${params.userLogin}`)
  }
  // @todo: Get single book

  // ***************** CHAPTER ENDPOINTS ****************** //

  newChapter (body, params) {
    return this._client.post(`/chapter/${params.bookId}`, body)
  }
  editChapter (body, params) {
    return this._client.put(`/chapter/${params.chapterId}`, body)
  }
  deleteChapter (params) {
    return this._client.delete(`/chapter/${params.bookId}/${params.chapterId}`)
  }
  // @todo: Get single chapter
  getBookChapters (params) {
    return this._client.get(`/chapter/${params.bookId}`)
  }
}
