import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'
import { errorTip } from '@/utils/viewTools'
const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 1000 * 12
})

http.interceptors.request.use(config => {
  config.headers.Authorization = store.state.user
  NProgress.start()
  return config
})

http.interceptors.response.use(response => {
  const { data } = response
  // return console.log(data);
  /* 统一处理错误请求 */
  NProgress.done ()
  switch (data.status) {
    case 200:
    case 201:
      return response
    case 404:
      return errorTip('页面不存在~~')
    case 422:
      return errorTip(data.msg)
    case 500:
      return errorTip('INTERNET ERROR!')
    default: return response
      break;
  }
  if (data.status !== 200 && data.status !== 201) errorTip(data.msg)
  return response
})

export default http