import axios from './http'
import { successTip } from '@/utils/viewTools'
export const lgReq = async form => {
  const { data } = await axios.post('/user/login', form)
  console.log(data);
  if (data.status === 200) {
    successTip('登陆成功!')
    return data.adminToken
  }
}
