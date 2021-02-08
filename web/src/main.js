// import app from '@/plugin/element'
import { createApp } from 'vue'
import App from '@/App'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import '@/assets/css/global.css'
/* markdown 样式 */
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/monokai.css'
/* 代码高亮 */
// import highlight from 'highlight.js'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App)

// app.directive('highlight', function (el) {
//   const blocks = el.querySelectorAll('pre code')
//   blocks.forEach(block => {
//     highlight.highlightBlock(block)
//   })
// })
app
  .use(store)
  .use(router)
  .use(ElementPlus, { locale })
  .mount('#app')
export default app