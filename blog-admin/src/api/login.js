import axios from './http'
import { successTip, errorTip } from '@/utils/viewTools'
export const lgReq = async (form, router) => {
  const { data } = await axios.post('/user/login', form)
  if (data.status !== 422) {
    successTip('登陆成功!')
    router.push('/users')
    return data.adminToken
  }
}
