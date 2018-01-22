export default {

  isEmpty (param) {
    return (param == null || param === '' || param === undefined)
  },

  isEmptyArray (param) {
    return (param.length === 0)
  }

}
