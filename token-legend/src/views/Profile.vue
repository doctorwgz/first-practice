<script setup>
import { useRouter } from 'vue-router'
import StatusBar from '../components/StatusBar.vue'
import BottomNav from '../components/BottomNav.vue'
import { asset } from '../utils/asset.js'

const router = useRouter()

const user = JSON.parse(localStorage.getItem('dc_user') || '{}')

function goLeaderboard() {
  router.push('/leaderboard')
}

function goLogin() {
  localStorage.removeItem('token')
  localStorage.removeItem('dc_user')
  router.replace('/login')
}
</script>

<template>
  <div class="screen profile no-scrollbar">
    <!-- 顶部用户信息区 -->
    <header class="profile-hero">
      <StatusBar />
      <div class="user-card">
        <img class="avatar" :src="asset('/assets/home/deepmate_logo.png')" alt="avatar" />
        <div class="user-info">
          <div class="user-name">{{ user.nickname || user.jingwang_id || 'DeepChart 用户' }}</div>
          <div class="user-id">精网号: {{ user.jingwang_id || '--' }}</div>
        </div>
      </div>
    </header>

    <!-- 功能菜单 -->
    <main class="menu-list">
      <!-- 排行榜入口 -->
      <div class="menu-card" @click="goLeaderboard">
        <div class="menu-left">
          <span class="menu-icon trophy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
          </span>
          <span class="menu-label">TOKEN 传奇榜</span>
        </div>
        <span class="menu-arrow">›</span>
      </div>

      <!-- 回到登录页 / 退出登录 -->
      <div class="menu-card logout" @click="goLogin">
        <div class="menu-left">
          <span class="menu-icon exit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </span>
          <span class="menu-label">退出登录</span>
        </div>
        <span class="menu-arrow">›</span>
      </div>
    </main>

    <div class="scroll-pad"></div>

    <!-- 底部导航 -->
    <BottomNav active="mine" />
  </div>
</template>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  background: #f4f5f7;
}

/* 顶部用户信息区 */
.profile-hero {
  background: linear-gradient(
    180deg,
    #ff9c8e 0%,
    #ffb3a6 30%,
    #ffd2ca 60%,
    #f4f5f7 100%
  );
  padding-bottom: 24px;
}
.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px 0;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #fff;
  box-shadow: 0 4px 14px rgba(245, 72, 90, 0.18);
}
.user-name {
  font-size: 20px;
  font-weight: 800;
  color: #1a1d24;
  line-height: 1.3;
}
.user-id {
  font-size: 13px;
  color: #7a5e5a;
  margin-top: 4px;
  font-weight: 500;
}

/* 功能菜单 */
.menu-list {
  flex: 1;
  padding: 12px 14px 0;
}
.menu-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 12px;
  box-shadow: 0 4px 14px rgba(20, 30, 60, 0.05);
  cursor: pointer;
  transition: transform 0.1s ease;
}
.menu-card:active {
  transform: scale(0.99);
}
.menu-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.menu-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-icon svg {
  width: 20px;
  height: 20px;
}
.menu-icon.trophy {
  background: #fff5e6;
  color: #f6b73c;
}
.menu-icon.exit {
  background: #ffeef0;
  color: var(--brand-red);
}
.menu-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}
.menu-arrow {
  font-size: 18px;
  color: #c2c7d0;
  font-weight: 400;
}

.scroll-pad {
  height: 8px;
}
</style>
