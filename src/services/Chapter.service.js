import CucHttpService from './Cuc.Http.service'
import common from './common.service'
import Auth from './auth.service'

let cucHttp = new CucHttpService('conteumconto', Auth.getAuthHeader())

export default class ChapterService {
  /**
   * Iterate over the books and inject chapter dependency
   * @param {Array} books
   */
  static resolve (books) {
    return books.map(book => ChapterService._loadChaptersFromApi(book))
  }

  /**
   * Iterate over the books and inject unique chapter
   * @param {Object} chapter
   */
  static addChapter (books, chapter) {
    return books.map(book => {
      if (book._id === chapter._book) {
        delete chapter['_book']
        chapter.url = {name: 'write-existent-chapter', params: {chapter_id: chapter._id}}
        book.chapters.push(chapter)
      }
      return book
    })
  }

  /**
   * Iterate over the books and update unique chapter
   * @param {Object} updatedChapter
   */
  static updateChapter (books, updatedChapter) {
    return books.map(book => {
      if (book._id === updatedChapter._book) {
        if (updatedChapter.deleted) {
          book.chapters = book.chapters.filter(chapter => chapter._id !== updatedChapter._id)
        } else {
          book.chapters.forEach(chapter => {
            if (chapter._id === updatedChapter._id) {
              chapter.chapterText = updatedChapter.chapterText
              chapter.title = updatedChapter.title
              return
            }
          })
        }
      }
      return book
    })
  }

  /**
   * Get array of books and add vue router url to each chapter inside
   * @param {Array} books
   */
  static addUrlToChapters (books) {
    return books.map(book => {
      if (!common.isEmpty(book.chapters)) {
        book.chapters.map(chapter => {
          chapter.url = {name: 'write-existent-chapter', params: {chapter_id: chapter._id}}
          return chapter
        })
      }
      return book
    })
  }

  static getChapterData (bookId, chapterId) {
    const books = JSON.parse(localStorage.getItem('Student')).books
    let chapterData = null
    books.forEach(book => {
      if (book._id === bookId) {
        chapterData = book.chapters.find(chapter => {
          return chapter._id === chapterId
        })
      }
    })
    if (common.isEmpty(chapterData)) throw new Error('chapter_not_found')
    return chapterData
  }
}
