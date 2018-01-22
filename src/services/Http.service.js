import { apiConfig } from '../config/api.config'
import axios from 'axios'

export const getClient = (api, headers) => {
  return axios.create({
    baseURL: apiConfig[api][process.env.NODE_ENV],
    timeout: 3000,
    headers: headers
  })
}

export default class HttpService {
  constructor (api, headers) {
    this._client = axios.create({
      baseURL: apiConfig[api][process.env.NODE_ENV],
      timeout: 3000,
      headers: headers
    })
  }

  get client () {
    return this._client
  }

  setAuthHeaders (token) {
    this._client.defaults.headers.common['Authorization'] = token
  }
}
