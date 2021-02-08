import axios from './http'
import { nanoid } from 'nanoid'
import { successTip } from '@/utils/viewTools'
// 登录请求
export const loginRequest = async (form, router) => {
  const { data } = await axios.post('/user/login', form)
  if (data.status !== 422) {
    successTip(data.msg)
    router.push('/home')
    return data.token
  }
}
// 注册请求
export const registerRequest = async (form, router) => {
  const { username, password } = form
  const { data } = await axios.post('/user/register', {
    id: nanoid(),
    ...form
  })
  if (data.status !== 422) {
    successTip(data.msg)
    setTimeout(() => {
      router.push({
        name: 'Login', params: { username, password }
      })
    }, 1500)
  }
}