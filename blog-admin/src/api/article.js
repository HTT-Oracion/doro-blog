import axios from './http'
import { nanoid } from 'nanoid'
import { successTip, errorTip, infoTip } from '@/utils/viewTools'
// 文章列表
export const getArticlesRequest = async queryInfo => {
  const { data } = await axios.get('/articlelist', {
    params: queryInfo
  })
  console.log(data);
  if (data.status === 200) {
    return data
  }
}
export const addArticleRequest = async form => {
  const id = nanoid()
  const { data } = await axios.post('/add/article', {
    id,
    ...form
  })
  if (data.status === 200) successTip('添加文章成功!')
}
// 通过id 查找文章详情
export const getArticleById = async (id) => {
  const { data } = await axios.get(`/article/${id}`)
  if (data.status === 200) {
    return data.result
  }
}
// 修改文章
export const updateArticleById = async (id, form) => {
  const { data } = await axios.put(`/article/${id}`, {
    params: form
  })
  if (data.status === 200) successTip('修改成功!')
}
// 删除文章
export const deleteArticleById = async id => {
  const { data } = await axios.delete(`/article/${id}`)
  if (data.status === 200) successTip('删除成功!')
}