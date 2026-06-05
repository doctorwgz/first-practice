<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/home')
}
</script>

<
<template>
  <div class="missing-page">
    <!-- 顶部导航 -->
    <div class="top-bar">
      <button class="back-btn" @click="goBack">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>返回</span>
      </button>
    </div>

    <!-- 404 标题 -->
    <div class="error-header">
      <h1 class="error-code">404</h1>
      <p class="error-sub">JIUFU FINANCE</p>
    </div>

    <!-- 3D图标网格 -->
    <div class="icons-grid">
      <div class="icon-item">
        <div class="icon-box folder">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect
              x="8"
              y="12"
              width="48"
              height="40"
              rx="4"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <rect
              x="8"
              y="8"
              width="24"
              height="12"
              rx="2"
              fill="#d0d0d0"
              stroke="#ccc"
              stroke-width="1"
            />
            <rect
              x="20"
              y="24"
              width="24"
              height="20"
              rx="2"
              fill="#f5f5f5"
              stroke="#ddd"
              stroke-width="1"
            />
          </svg>
        </div>
      </div>

      <div class="icon-item">
        <div class="icon-box box">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect
              x="12"
              y="20"
              width="40"
              height="32"
              rx="4"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <path d="M12 20 L32 8 L52 20" fill="#f0f0f0" stroke="#ccc" stroke-width="1" />
            <circle cx="32" cy="14" r="4" fill="#ddd" />
          </svg>
        </div>
      </div>

      <div class="icon-item">
        <div class="icon-box envelope">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect
              x="8"
              y="16"
              width="48"
              height="32"
              rx="4"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <path d="M8 20 L32 36 L56 20" fill="none" stroke="#ccc" stroke-width="1" />
            <path d="M8 48 L24 32" fill="none" stroke="#ccc" stroke-width="1" />
            <path d="M56 48 L40 32" fill="none" stroke="#ccc" stroke-width="1" />
          </svg>
        </div>
      </div>

      <div class="icon-item">
        <div class="icon-box package">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect
              x="12"
              y="16"
              width="40"
              height="32"
              rx="4"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <path d="M32 16 L32 48" stroke="#ccc" stroke-width="1" />
            <path d="M12 28 L52 28" stroke="#ccc" stroke-width="1" />
            <circle cx="32" cy="24" r="3" fill="#ddd" />
          </svg>
        </div>
      </div>

      <div class="icon-item">
        <div class="icon-box document">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect
              x="16"
              y="8"
              width="32"
              height="48"
              rx="4"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <rect x="24" y="20" width="16" height="2" fill="#ccc" />
            <rect x="24" y="28" width="16" height="2" fill="#ccc" />
            <rect x="24" y="36" width="12" height="2" fill="#ccc" />
            <circle cx="32" cy="44" r="6" fill="#ddd" stroke="#ccc" stroke-width="1" />
          </svg>
        </div>
      </div>

      <div class="icon-item">
        <div class="icon-box lock">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect
              x="16"
              y="28"
              width="32"
              height="28"
              rx="4"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <path
              d="M24 28 L24 20 C24 12 40 12 40 20 L40 28"
              fill="none"
              stroke="#ccc"
              stroke-width="1"
            />
            <circle cx="32" cy="42" r="4" fill="#ddd" />
            <rect x="30" y="42" width="4" height="8" fill="#ccc" />
          </svg>
        </div>
      </div>

      <div class="icon-item">
        <div class="icon-box clipboard">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <rect
              x="16"
              y="12"
              width="32"
              height="44"
              rx="4"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <rect
              x="24"
              y="8"
              width="16"
              height="8"
              rx="2"
              fill="#d0d0d0"
              stroke="#ccc"
              stroke-width="1"
            />
            <rect x="22" y="24" width="20" height="2" fill="#ccc" />
            <rect x="22" y="32" width="20" height="2" fill="#ccc" />
            <rect x="22" y="40" width="16" height="2" fill="#ccc" />
          </svg>
        </div>
      </div>

      <div class="icon-item">
        <div class="icon-box house">
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 8 L8 28 L8 56 L56 56 L56 28 Z"
              fill="#e8e8e8"
              stroke="#ccc"
              stroke-width="1"
            />
            <path d="M32 8 L32 4" stroke="#ccc" stroke-width="1" />
            <rect
              x="24"
              y="36"
              width="16"
              height="20"
              rx="2"
              fill="#f0f0f0"
              stroke="#ccc"
              stroke-width="1"
            />
            <circle cx="32" cy="28" r="4" fill="#ddd" stroke="#ccc" stroke-width="1" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="message-section">
      <h2 class="message-title">功能开发中</h2>
      <p class="message-desc">该功能尚未上线，敬请期待</p>
    </div>

    <!-- 底部按钮 -->
    <div class="action-buttons">
      <button class="btn-secondary" @click="goBack">返回上一页</button>
      <button class="btn-primary" @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<style scoped>
.missing-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f8f8 0%, #ffffff 100%);
  padding: 16px;
  max-width: 430px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

/* 顶部导航 */
.top-bar {
  padding: 8px 0;
  margin-bottom: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-size: 15px;
  color: #333;
  cursor: pointer;
  padding: 8px;
}

/* 404标题 */
.error-header {
  text-align: center;
  margin-bottom: 32px;
}

.error-code {
  font-size: 48px;
  font-weight: 800;
  color: #333;
  letter-spacing: 4px;
  line-height: 1;
}

.error-sub {
  font-size: 12px;
  color: #999;
  letter-spacing: 8px;
  margin-top: 8px;
  text-transform: uppercase;
}

/* 3D图标网格 */
.icons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 0 20px;
  margin-bottom: 40px;
}

.icon-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-box {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.05),
    0 10px 20px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid #f0f0f0;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.icon-box:hover {
  transform: translateY(-4px);
  box-shadow:
    0 8px 12px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.05);
}

/* 提示信息 */
.message-section {
  text-align: center;
  margin-bottom: 32px;
}

.message-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.message-desc {
  font-size: 14px;
  color: #999;
}

/* 底部按钮 */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 20px;
  margin-top: auto;
  margin-bottom: 32px;
}

.btn-secondary,
.btn-primary {
  width: 100%;
  padding: 14px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-secondary {
  background: #f0f0f0;
  color: #666;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-primary {
  background: #333;
  color: #fff;
}

.btn-primary:hover {
  background: #444;
  transform: translateY(-1px);
}
</style>
