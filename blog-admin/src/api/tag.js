import axios from './http'
import { successTip } from '@/utils/viewTools'
export const removeTagFromArcicle = async (id, name) => {
  const { data } = await axios.delete(`/article/tag/${id}`, {
    params: name
  })
  console.log(data);
  if (data.status === 200) successTip(data.msg)
}