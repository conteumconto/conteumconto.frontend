/**
 * Export API URLs as objects to be used by http.service
 * @see: ../services/http.service.js
 */
export const apiConfig = {
  conteumconto: {
    localhost: 'http://localhost:3000',
    development: 'https://cuc-api-desenvolvimento.herokuapp.com',
    production: 'https://conte-um-conto-api.herokuapp.com'
  }
}
