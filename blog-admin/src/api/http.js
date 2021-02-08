import axios from 'axios'
import store from '@/store'
const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 1000 * 12
})
http.interceptors.request.use(config => {
  config.headers.Authorization = store.state.admin
  return config
})
http.interceptors.response.use(response => {
  return response
})

export default http