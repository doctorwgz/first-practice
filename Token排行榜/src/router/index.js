// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import NotFound from '@/views/NotFound.vue'
import HomeView from '@/views/HomeView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import DefaultView from '@/views/DefaultView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/home', name: 'Home', component: HomeView, meta: { keepAlive: true } },
  { path: '/leaderboard', name: 'Leaderboard', component: LeaderboardView },
  { path: '/default', name: 'Default', component: DefaultView },
  { path: '/notfound', name: 'NotFound', component: NotFound },
  { path: '/:pathMatch(.*)*', redirect: '/default' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router