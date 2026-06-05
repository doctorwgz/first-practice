<script setup>
// 应用根组件:提供移动端“手机壳”容器,桌面端居中展示,移动端铺满
</script>

<template>
  <div class="app-stage">
    <div class="phone-frame">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.app-stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(1200px 600px at 20% -10%, #1b2a4a 0%, transparent 60%),
    radial-gradient(1000px 500px at 100% 0%, #122038 0%, transparent 55%),
    #0b1220;
  padding: 0;
}

.phone-frame {
  position: relative;
  width: 100%;
  max-width: 414px;
  height: 100vh;
  max-height: 896px;
  background: #f4f5f7;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}

/* 桌面端给手机壳加圆角边框,更接近真机预览 */
@media (min-width: 480px) {
  .phone-frame {
    border-radius: 32px;
    border: 8px solid #0c1120;
    height: 880px;
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
