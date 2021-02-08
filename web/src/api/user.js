import axios from './http'

export const getUserById = async id => {
  const { data } = await axios.get(`/user/${id}`)
  return data.result
}