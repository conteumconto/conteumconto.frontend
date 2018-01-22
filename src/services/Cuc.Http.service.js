import HttpService from './Http.service'

export default class CucHttpService extends HttpService {

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
    return this._client.delete(`/student/${params.login}`)
  }
  getStudent (params) {
    return this._client.get(`/student/${params.login}`)
  }

  // ****************** TEACHER ENDPOINTS ****************** //

  // @todo: Get teacher
  // @todo: Edit teacher
  // @todo: Delete teacher

  // ******************* BOOK ENDPOINTS ******************* //

  newBook (body, params) {
    return this._client.post(`/book/${params.studentLogin}`, body)
  }
  editBook (body, params) {
    return this._client.put(`/book/id/${params.bookId}`, body)
  }
  deleteBook (params) {
    return this._client.delete(`/book/id/${params.bookId}`)
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
    return this._client.put(`/chapter/id/${params.bookId}`, body)
  }
  deleteChapter (params) {
    return this._client.delete(`/chapter/id/${params.chapterId}`)
  }
  // @todo: Get single chapter
  getBookChapters (params) {
    return this._client.get(`/chapter/id/${params.bookId}`)
  }
}
