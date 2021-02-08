import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BreadCrumb from '@/components/BreadCrumb'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局样式
import '@/assets/css/global.css'
// markdown 编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.component('bread-crumb', BreadCrumb)
Vue.filter('formatTime', function (dateTime) {
  const date = new Date(dateTime)
  const y = date.getFullYear()
  const m = (date.getMonth() + 1 + '').padStart(2, '0')
  const h = (date.getHours() + '').padStart(2, '0')
  const mm = (date.getMinutes() + '').padStart(2, '0')
  const ss = (date.getSeconds() + '').padStart(2, '0')
  return `${y}-${m} ${h}:${mm}:${ss}`
})
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
