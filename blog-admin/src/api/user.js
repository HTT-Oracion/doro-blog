import axios from './http'
import { successTip } from '@/utils/viewTools'
import { nanoid } from 'nanoid'

// 用户列表
export const getUsersRequest = async queryInfo => {
  console.log(queryInfo);
  const { data } = await axios.get('/userlist', { params: queryInfo })
  if (data.status === 200) return data
}

// 添加用户
export const addUserRequeset = async form => {
  const { data } = await axios.post('/user/create', {
    id: nanoid(),
    ...form
  })
  successTip(data.msg)
}
// 删除用户
export const deleteUserById = async id => {
  const { data } = await axios.delete(`/user/${id}`)
  if (data.status === 200) successTip(data.msg)
}
// 编辑用户信息
export const editUserRequest = async (form) => {
  const { data } = await axios.put('/user/edit', form)
  if (data.status === 200) {
    successTip(data.msg)
    return data
  }
}
// 获取用户信息
export const getUserById = async id => {
  const { data } = await axios.get(`/user/${id}`)
  return data.result
}