import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Leaderboard from '../views/Leaderboard.vue'
import Placeholder from '../views/Placeholder.vue'
import Profile from '../views/Profile.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login, meta: { title: '登录 DeepChart' } },
  { path: '/home', name: 'home', component: Home, meta: { title: 'DeepChart 首页' } },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard,
    meta: { title: 'TOKEN传奇榜', requiresAuth: true }
  },
  { path: '/profile', name: 'profile', component: Profile, meta: { title: '我的', requiresAuth: true } },
  // 缺省页 / 404:首页中所有”点击跳转至缺省页”的入口统一落到这里
  { path: '/placeholder', name: 'placeholder', component: Placeholder, meta: { title: '缺省页' } },
  { path: '/:pathMatch(.*)*', redirect: '/placeholder' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// 路由守卫:未登录访问需要登录的页面,跳转登录页
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta?.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
