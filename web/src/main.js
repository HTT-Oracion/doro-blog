import { createApp } from 'vue'
import App from '@/App'
import {
  ElButton,
  ElHeader,
  ElAside,
  ElFooter,
  ElMain,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElLoading,
  ElMessageBox,
  ElMessage,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElPopover,
  ElContainer,
  ElImage,
  ElTag,
  ElPagination,
  ElRow,
  ElCol,
  ElAvatar
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'

import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import '@/assets/css/global.css'
/* markdown 样式 */
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/monokai.css'

const plugins = [
  ElButton,
  ElHeader,
  ElAside,
  ElFooter,
  ElMain,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon,
  ElLoading,
  ElMessageBox,
  ElMessage,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElPopover,
  ElContainer,
  ElImage,
  ElTag,
  ElPagination,
  ElRow,
  ElCol,
  ElAvatar
]
const app = createApp(App)

// 设置语言
locale.use(lang)
plugins.forEach(plugin => {
  app.use(plugin)
})

app
  .use(store)
  .use(router)
  .mount('#app')
