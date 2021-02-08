import { createStore } from 'vuex'
import { getItem, setItem } from '@/utils/storage'
const USER_TOKEN = 'user',
  ACTIVE_INDEX = 'activeIndex',
  ADMIN_TOKEN = 'adminToken',
  TAGS_NUMBER = 'tagsNumber',
  TAG_LIST = 'tagList',
  ARTICLES_NUMBER = 'articlesNumber'
export default createStore({
  state: {
    user: getItem(USER_TOKEN),
    admin: getItem(ADMIN_TOKEN),
    activeIndex: getItem(ACTIVE_INDEX),
    tagsNumber: getItem(TAGS_NUMBER),
    tagList: getItem(TAG_LIST),
    articlesNumber: getItem(ARTICLES_NUMBER),
    changeLoad: false
  },
  mutations: {
    setUser (state, value) {
      state.user = value
      setItem(USER_TOKEN, value)
    },
    setAdminToken (state, value) {
      state.admin = value
      setItem(ADMIN_TOKEN, value)
    },
    setActiveIndex (state, value) {
      state.activeIndex = value
      setItem(ACTIVE_INDEX, value)
    },
    setChangeLoad (state, value) {
      state.changeLoad = value
    },
    setTagsNumber (state, value) {
      state.tagsNumber = value
    },
    setTagList (state, value) {
      state.tagList = value
    },
    setArticlesNumber (state, value) {
      state.articlesNumber = value
    },
  },
  actions: {
  },
  modules: {
  }
})
