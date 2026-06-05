<script setup>
import { useRouter } from 'vue-router'
import { asset } from '../utils/asset.js'

// active: 当前高亮项 key
defineProps({
  active: { type: String, default: 'home' }
})

const router = useRouter()

const items = [
  { key: 'home', label: '首页' },
  { key: 'market', label: '行情' },
  { key: 'deepmate', label: 'DeepMate', center: true },
  { key: 'explore', label: '深度探索' },
  { key: 'mine', label: '我的' }
]

// 首页高亮;其余点击跳缺省页(PDF 要求)
function onTap(item) {
  if (item.key === 'home') {
    router.push('/home')
    return
  }
  if (item.key === 'mine') {
    router.push('/profile')
    return
  }
  router.push('/placeholder')
}
</script>

<template>
  <nav class="bottom-nav">
    <button
      v-for="it in items"
      :key="it.key"
      class="nav-item"
      :class="{ active: active === it.key, center: it.center }"
      @click="onTap(it)"
    >
      <template v-if="it.center">
        <span class="center-btn">
          <img :src="asset('/assets/bottomNav/DeepMate.png')" alt="DeepMate" />
        </span>
      </template>
      <template v-else>
        <span class="nav-ic" v-html="iconSvg(it.key)"></span>
      </template>
      <span class="nav-label">{{ it.label }}</span>
    </button>
  </nav>
</template>

<script>
// 简单内联图标
function iconSvg(key) {
  const map = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>',
    market:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l5-6 4 4 6-8"/><path d="M3 21h18"/></svg>',
    explore:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 4-4 2 2-4z"/></svg>',
    mine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>'
  }
  return map[key] || ''
}
export default { methods: { iconSvg } }
</script>

<style scoped>
.bottom-nav {
  position: sticky;
  bottom: 0;
  height: 60px;
  background: #fff;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 20;
}
.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  color: #9aa0ac;
  font-size: 11px;
}
.nav-item.active {
  color: var(--brand-red);
  font-weight: 600;
}
.nav-ic {
  width: 23px;
  height: 23px;
}
.nav-ic :deep(svg) {
  width: 23px;
  height: 23px;
}
.nav-item.center {
  position: relative;
}
.center-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8a9b, #f5394a);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -26px;
  box-shadow: 0 6px 16px rgba(245, 57, 74, 0.4);
  border: 3px solid #fff;
}
.center-btn img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.nav-item.center .nav-label {
  margin-top: -2px;
}
</style>
