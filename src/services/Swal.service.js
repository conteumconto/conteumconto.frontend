// @see: https://sweetalert2.github.io/
import swal from 'sweetalert2'

export default class Swal {

  constructor () {
    this._swal = swal
    this._setDefaults()
  }

  _setDefaults () {
    this._swal.setDefaults({
      allowOutsideClick: false,
      reverseButtons: true,
      allowEscapeKey: false,
      position: 'center',
      showCancelButton: false
    })
  }

  close () {
    return this._swal.close()
  }

  simpleLoading () {
    return this._swal.showLoading()
  }

  loading (text, timer) {
    return this._swal({
      title: 'Carregando...',
      text,
      timer: timer || 0,
      onOpen: () => {
        this.simpleLoading()
      }
    })
  }

  simpleSuccess (title, text) {
    return this._swal({
      title,
      text,
      type: 'success'
    })
  }

  successWithRedirect (title, text, fn) {
    return this._swal({
      title,
      text,
      type: 'success',
      onClose: fn()
    })
  }

  simpleError (title, text) {
    return this._swal({
      title,
      text,
      type: 'error'
    })
  }

  simpleWarning (title, text) {
    return this._swal({
      title,
      text,
      type: 'warning'
    })
  }

  simpleInfo (title, text) {
    return this._swal({
      title,
      text,
      type: 'info',
      timer: 5000
    })
  }

  simpleConfirmation (title, text, confirmButtonText, cancelButtonText) {
    return this._swal({
      title,
      text,
      type: 'warning',
      showCloseButton: false,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    })
  }

  simpleQuestion (title, text, confirmButtonText, cancelButtonText) {
    return this._swal({
      title,
      text,
      type: 'question',
      showCloseButton: false,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    })
  }

  simpleImage (title, text, imageUrl, imageAlt) {
    return this._swal({
      title,
      text,
      imageUrl,
      imageAlt,
      imageWidth: 400,
      imageHeight: 200
    })
  }

  simpleValidationError (text) {
    return this._swal.showValidationError(text)
  }

}

