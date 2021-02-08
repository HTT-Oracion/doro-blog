import axios from './http'
import { successTip, errorTip } from '@/utils/viewTools'
// export const getArticleList = async (id = "11") => {
//   const data = await axios.get(`/article/${id}`)
//   console.log(data);
//   if (data.status === 200)
//     return data.data
// }
/* 搜索文章 */
export const getTagsRequest = async () => {
  const { data } = await axios.get(`/tags`)
  // console.log(data);
  if (data.status === 200) {
    successTip(data.msg)
  }
  return data.result
}