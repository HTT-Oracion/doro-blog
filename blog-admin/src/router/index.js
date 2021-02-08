import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home', name: 'Home', component: () => import('@/views/Home'),
    meta: { requireAuth: true },
    children: [
      { path: '/users', component: () => import('@/views/Users'), meta: { requireAuth: true } },
      { path: '/articles', component: () => import('@/views/Articles'), meta: { requireAuth: true } },
      { path: '/article/add', component: () => import('@/views/AddArticle'), meta: { requireAuth: true } },
      { path: '/comments', component: () => import('@/views/Comments'), meta: { requireAuth: true } },
      { path: '/others', component: () => import('@/views/Others'), meta: { requireAuth: true } },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const admin = store.state.admin
  if (to.meta.requireAuth) {
    if (!admin) next('/login')
  }
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
