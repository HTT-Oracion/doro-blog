import axios from './http'
import store from '@/store'
import { successTip } from '@/utils/viewTools'

/*  获取文章列表 */
export const getArticlesRequest = async queryInfo => {
  const { data } = await axios.get('/articles', { params: queryInfo })
  console.log(data);
  if (data.status === 200) return data
}

/* 搜索文章 */
export const getSearchRequest = async params => {
  const key = String(params)
  const { data } = await axios.get(`/search?key=${key}`)
  if (data.status === 200) {
    successTip(data.msg)
    return data.data
  }
}

/* 文章详情  id="11" 文章为测试文章 */
export const getArticleList = async (id = "11") => {
  const data = await axios.get(`/article/${id}`)
  console.log(data);
  if (data.status === 200)
    return data.data
}


/* 随机文章 */
export const getRandArticleRequest = async () => {
  store.commit('setChangeLoad', true)
  const { data } = await axios.get('/some/articles')
  if (data.status === 200) {
    store.commit('setChangeLoad', false)
    return data.result
  }
}

/* 最新文章 */
export const getNewestArticle = async () => {
  const { data } = await axios.get('/articles/newest')
  console.log(data);
  if (data.status === 200) {
    return data.result
  }
}