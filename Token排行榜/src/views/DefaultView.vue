<template>
  <div class="default-page">
    <div class="back-btn" @click="goBack">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2.5">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </div>
    <div class="content">
      <div class="icon">🚧</div>
      <h2>功能开发中</h2>
      <p>该功能正在紧锣密鼓开发中，敬请期待</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goBack() {
  router.push('/home')
}
</script>

<style scoped>
.default-page {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 16px;
  left: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.content {
  text-align: center;
}

.icon {
  font-size: 64px;
  margin-bottom: 20px;
}

h2 {
  color: #333;
  font-size: 20px;
  margin-bottom: 12px;
}

p {
  color: #888;
  font-size: 14px;
}
</style>
