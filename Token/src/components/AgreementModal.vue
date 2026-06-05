<script setup lang="ts">
defineEmits<{
  close: []
  agree: []
}>()
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <p class="modal-text">登录前，请阅读并同意《用户服务协议》和《用户隐私政策》</p>
      <div class="modal-actions">
        <button class="btn-cancel" @click="$emit('close')">取消</button>
        <button class="btn-agree" @click="$emit('agree')">同意</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
}

.modal-text {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 28px;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.btn-cancel,
.btn-agree {
  flex: 1;
  padding: 12px 20px;
  border-radius: 24px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  font-weight: 500;
}

.btn-cancel {
  background: #f0f0f0;
  color: #999;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-agree {
  background: #000;
  color: #fff;
}

.btn-agree:hover {
  background: #333;
}
</style>
