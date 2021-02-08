import axios from './http'
import { nanoid } from 'nanoid'
import { successTip, errorTip, infoTip } from '@/utils/viewTools'

export const getCommentsRequest = async queryInfo => {
  const { data } = await axios.get('/comments', {
    params: queryInfo
  })
  return data
}
export const removeById = async id => {
  const { data } = await axios.delete(`/comment/${id}`)
  if (data.status === 200) successTip(data.msg)
}