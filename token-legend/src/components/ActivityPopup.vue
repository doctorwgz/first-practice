<script setup>
// 进入首页(会员)自动弹出的「TOKEN传奇榜」活动弹窗
// 点击“立即参加” → 跳排行榜;点击其余区域 → 关闭
import { asset } from '../utils/asset.js'
const emit = defineEmits(['join', 'close'])
</script>

<template>
  <transition name="pop">
    <div class="popup-mask" @click.self="emit('close')">
      <div class="popup-wrap">
        <button class="close-btn" @click="emit('close')" aria-label="关闭">×</button>

        <!-- 切图主视觉(含金杯 + 立即参加按钮样式) -->
        <img class="popup-img" :src="asset('/assets/activity/popup.png')" alt="TOKEN传奇榜" />

        <!-- 覆盖在切图底部“立即参加”位置的可点击按钮 -->
        <button class="join-btn" @click="emit('join')">立即参加</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.popup-mask {
  position: absolute;
  inset: 0;
  background: rgba(8, 12, 24, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
}
.popup-wrap {
  position: relative;
  width: 290px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup-img {
  width: 100%;
  height: auto;
  pointer-events: none;
}
/* 透明按钮精确覆盖切图里“立即参加”胶囊位置 */
.join-btn {
  position: absolute;
  left: 50%;
  bottom: 4%;
  transform: translateX(-50%);
  width: 56%;
  height: 13%;
  border-radius: 999px;
  /* 调试时可改为 rgba(255,0,0,.3) 查看热区 */
  background: transparent;
  font-size: 0;
}
.join-btn:active {
  background: rgba(255, 255, 255, 0.15);
}
.close-btn {
  position: absolute;
  top: -42px;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #fff;
  font-size: 20px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pop-enter-active {
  transition: opacity 0.25s ease;
}
.pop-leave-active {
  transition: opacity 0.2s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
}
.pop-enter-active .popup-wrap {
  animation: popIn 0.32s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}
@keyframes popIn {
  from {
    transform: scale(0.7);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
