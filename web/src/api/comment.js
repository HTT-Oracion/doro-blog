import axios from './http'
import store from '@/store'
import { nanoid } from 'nanoid'
import { successTip } from '@/utils/viewTools'

export const getMessagesRequest = async () => {
  const { data } = await axios.get('messages')
  console.log(data);
  return data.result
}

export const addMessageRequest = async message => {
  const id = nanoid()
  const date = Date.now()
  const { data } = await axios.post('/add/messages', {
    id,
    date,
    ...message
  })
  console.log(data);
}
export const getCommentsByArticle = async id => {
  const { data } = await axios.get(`/article/${id}/comments`)
  console.log('getComments', data);
  if (data.status === 200) return data.result

}
export const addCommentByArticle = async (aid, comment) => {
  const id = nanoid()
  const date = Date.now()
  const { data } = await axios.post(`/article/${aid}/comments`, {
    id,
    date,
    ...comment
  })
  if (data.status === 200) successTip('添加评论成功！')
}

export const getNewestComment = async () => {
  const { data } = await axios.get(`/comments/newest`)
  console.log(data);
  return data.result

}