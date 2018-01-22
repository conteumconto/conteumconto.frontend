import CucHttpService from './Cuc.Http.service'
import Auth from './auth.service'

let cucHttp = new CucHttpService('conteumconto', Auth.getAuthHeader())

export default class ChapterService {
  /**
   * Iterate over the books and inject chapter dependency
   * @param {Array} books
   */
  static resolve (books) {
    return books.map((book) => ChapterService._loadChaptersFromApi(book))
  }

  /**
   * Create chapter discovery object to navigate through chapter resource
   * @param {Object} book
   */
  static _loadChaptersFromApi (book) {
    book.newChapterUrl = '/escrever/novo/' + book._id + '/'
    // discover book chapters
    cucHttp.setAuthHeaders(localStorage.getItem('token'))
    cucHttp.getBookChapters({bookId: book._id})
      .then(response => {
        if (response.length !== 0) {
          book.chapters = response.map(item => {
            return {
              title: item.title,
              url: '/escrever/editar/' + item._id + '/',
              id: item._id
            }
          })
        }
      })
      .catch(err => console.error(err))
    // return the book object with a way to navigate
    return book
  }
}
