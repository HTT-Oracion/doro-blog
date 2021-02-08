import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Login from '@/views/Login'
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: () => import('@/views/Login/Register') },
  {
    path: '/home', name: 'Home', component: () => import('@/views/Home'), redirect: '/homecontent',
    meta: { requireAuth: true },
    children: [
      { path: '/homecontent', component: () => import('@/components/HomeContent'), meta: { requireAuth: true }, },
      { path: '/article/list', component: () => import('@/views/ArticleList'), meta: { requireAuth: true }, },
      { path: '/photo', component: () => import('@/views/PhotoWall'), meta: { requireAuth: true }, },
      { path: '/tags', component: () => import('@/views/Tags'), meta: { requireAuth: true }, },
      { path: '/comment', component: () => import('@/views/Comment'), meta: { requireAuth: true }, },
      { path: '/article/:id', component: () => import('@/components/Article'), meta: { requireAuth: true }, },
      { path: '/result', name: 'Result', component: () => import('@/views/Result'), meta: { requireAuth: true }, }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const user = store.state.user
  NProgress.start()
  if (to.meta.requireAuth) {
    if (!user) next('/login')
  }
  next()
})
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (to.path === '/login' || to.path === '/register') return next()
//   const user = getItem('user')
//   if (!user) return next('/login')
//   next()
// })
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
