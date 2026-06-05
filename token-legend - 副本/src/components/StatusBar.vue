<script setup>
// 模拟 iOS 状态栏:固定显示 9:41 + 信号/wifi/电量
defineProps({
  dark: { type: Boolean, default: false }
})
</script>

<template>
  <div class="status-bar" :class="{ dark }">
    <span class="time">9:41</span>
    <span class="right">
      <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
        <rect x="0" y="7" width="3" height="4" rx="1" />
        <rect x="4.5" y="5" width="3" height="6" rx="1" />
        <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
        <rect x="13.5" y="0" width="3" height="11" rx="1" />
      </svg>
      <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor">
        <path d="M8 2.4c2.3 0 4.4.9 6 2.3l-1.4 1.5A6.6 6.6 0 0 0 8 4.4c-1.7 0-3.3.6-4.6 1.8L2 4.7A8.9 8.9 0 0 1 8 2.4Zm0 3.7c1.3 0 2.5.5 3.4 1.3L8 11 4.6 7.4A5 5 0 0 1 8 6.1Z" />
      </svg>
      <span class="battery">
        <span class="battery-body"><i></i></span>
        <span class="battery-cap"></span>
      </span>
    </span>
  </div>
</template>

<style scoped>
.status-bar {
  color: #111;
}
.status-bar.dark {
  color: #fff;
}
.time {
  font-weight: 700;
  font-size: 15px;
}
.battery {
  display: inline-flex;
  align-items: center;
  gap: 1px;
}
.battery-body {
  width: 22px;
  height: 11px;
  border: 1px solid currentColor;
  border-radius: 3px;
  padding: 1.5px;
  display: inline-flex;
  opacity: 0.9;
}
.battery-body i {
  flex: 0 0 70%;
  background: currentColor;
  border-radius: 1px;
}
.battery-cap {
  width: 1.5px;
  height: 4px;
  background: currentColor;
  border-radius: 0 1px 1px 0;
  opacity: 0.7;
}
</style>
