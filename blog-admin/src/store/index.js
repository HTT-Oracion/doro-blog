import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const ADMIN_TOKEN = 'admin',
  ACTIVE_INDEX = 'activeIndex'
export default new Vuex.Store({
  state: {
    admin: getItem(ADMIN_TOKEN),
    activeIndex: getItem(ACTIVE_INDEX)
  },
  mutations: {
    setAdmin (state, value) {
      state.admin = value
      setItem(ADMIN_TOKEN, value)
    },
    setActiveIndex (state, value) {
      state.activeIndex = value
      setItem(ACTIVE_INDEX, value)
    }
  },
  actions: {
  },
  modules: {
  }
})
