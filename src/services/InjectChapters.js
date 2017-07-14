import Vue from 'vue'
import globalConfig from './GlobalConfigs'
import Auth from '../auth/index'

const API_URL = globalConfig.getApiURL()

export default class InjectChapters {

  static resolve (books) {
    /*
      Iterate over the books
    */
    return books.map((book) => {
      /*
        Inject the chapter depencency
      */
      return InjectChapters._loadChaptersFromApi(book)
    })
  }

  static _loadChaptersFromApi (book) {
    /*
      the main porpuse of this method is to create
      a chapter discovery object to navigate through
      chapter resource.
    */
    // new book resource
    book.newChapterUrl = '/#/escrever/novo/' + book._id + '/'
    // discover book chapters
    Vue.http.get(API_URL + '/chapter/' + book._id + '/',
      {headers: Auth.getAuthHeader()}
    ).then(({body}) => {
      if (body.length !== 0) {
        book.chapters = body.map((item) => {
          return {
            title: item.title,
            url: '/#/escrever/editar/' + item._id + '/',
            id: item._id
          }
        })
      }
    },
    error => {
      console.log(error)
    })
    // return the book object with a way to navigate
    return book
  }
}

