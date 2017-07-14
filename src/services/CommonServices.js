export default {
  // Checks if the param is empty or undefined
  isEmpty (param) {
    if (param == null || param === '') {
      return true
    }
    return false
  },
  isEmptyArray (param) {
    if (param.length === 0) {
      return true
    }
    return false
  }
}
