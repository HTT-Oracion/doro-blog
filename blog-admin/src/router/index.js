import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const admin = store.state.admin
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/home', name: 'Home', component: () => import('@/views/Home'),
    children: [
      { path: '/users', component: () => import('@/views/Users'), },
      { path: '/articles', component: () => import('@/views/Articles'), },
      { path: '/article/add', component: () => import('@/views/AddArticle'), },
      { path: '/comments', component: () => import('@/views/Comments'), },
      { path: '/others', component: () => import('@/views/Others'), },
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    if (!admin) next('/login')
  }
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
export default router
