<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AgreementModal from '../components/AgreementModal.vue'

const router = useRouter()

const form = ref({
  account: '',
  password: '',
})

const agreementChecked = ref(false)
const showModal = ref(false)
const showPassword = ref(false)
const loading = ref(false)

// 创建 axios 实例
const request = axios.create({
  baseURL: 'https://6c403fea.r6.cpolar.top',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 登录按钮是否可点击
const isFormValid = computed(() => {
  return form.value.account && form.value.password && !loading.value
})

const showAgreementModal = () => {
  showModal.value = true
}

const handleModalAgree = () => {
  agreementChecked.value = true
  showModal.value = false
  performLogin()
}

const handleModalCancel = () => {
  showModal.value = false
}

// ===== 登录：验证账号密码 =====
const performLogin = async () => {
  loading.value = true

  try {
    const res = await request.post('/auth/login', {
      jingwang_id: form.value.account, // 账号
      password: form.value.password, // 密码（明文，后端哈希比对）
    })

    console.log('后端返回:', res.data)

    // 根据后端返回判断成功/失败
    if (res.data.success === true || res.data.code === 200 || res.data.status === 'ok') {
      // 登录成功，保存用户信息（不需要 token）
      localStorage.setItem(
        'deepchart_user',
        JSON.stringify({
          jingwang_id: form.value.account,
          nickname: res.data.user?.nickname || '',
          loginTime: new Date().toISOString(),
        }),
      )
      router.push('/home')
    } else {
      // 登录失败
      alert(res.data.message || res.data.error || '账号或密码错误')
    }
  } catch (err: any) {
    console.error('请求错误:', err)

    if (err.response) {
      // 后端返回了错误
      alert(err.response.data?.message || `服务器错误 (${err.response.status})`)
    } else if (err.request) {
      // 没收到响应（网络/跨域/后端未启动）
      alert('无法连接到服务器，请检查网络')
    } else {
      alert('请求发送失败')
    }
  } finally {
    loading.value = false
  }
}

// 登录按钮点击
const handleLogin = () => {
  if (!agreementChecked.value) {
    showModal.value = true
    return
  }
  performLogin()
}

const handleThirdParty = (type: string) => {
  alert(`通过${type === 'apple' ? '苹果' : 'Google'}登录功能开发中`)
  router.push('/missing')
}

const handleForgot = () => {
  router.push('/missing')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="login-page">
    <!-- 顶部关闭按钮 -->
    <div class="header">
      <button class="close-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <h1 class="title">登录DeepChart</h1>

    <!-- 标签 -->
    <div class="tab-container">
      <button class="tab-btn active">密码登录</button>
      <button class="tab-btn disabled" @click="router.push('/missing')">手机号</button>
      <button class="tab-btn disabled" @click="router.push('/missing')">邮箱</button>
      <div class="tab-indicator" style="left: 0%"></div>
    </div>

    <div class="form-container">
      <!-- 账号输入 -->
      <div class="input-group">
        <div class="input-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="#666"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#666"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <input
          v-model="form.account"
          type="text"
          placeholder="请输入DeepChart ID/精网号/邮箱"
          class="input-field"
          :disabled="loading"
        />
      </div>

      <!-- 密码输入 -->
      <div class="input-group">
        <div class="input-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="11"
              width="18"
              height="11"
              rx="2"
              ry="2"
              stroke="#666"
              stroke-width="2"
            />
            <path
              d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11"
              stroke="#666"
              stroke-width="2"
            />
          </svg>
        </div>
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
          class="input-field"
          :disabled="loading"
        />
        <button class="toggle-btn" @click="showPassword = !showPassword">
          <svg
            v-if="!showPassword"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            stroke-width="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            stroke-width="2"
          >
            <path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
            />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        </button>
      </div>

      <!-- 忘记密码 -->
      <div class="forgot-link">
        <a href="#" @click.prevent="handleForgot">忘记ID/密码</a>
      </div>

      <!-- 登录按钮 -->
      <button class="login-btn" :disabled="!isFormValid" @click="handleLogin">
        {{ loading ? '登录中...' : '登录' }}
      </button>

      <!-- 用户协议 -->
      <div class="agreement-section">
        <div class="agreement-label" @click="agreementChecked = !agreementChecked">
          <span class="check-icon" :class="{ checked: agreementChecked }">
            <svg v-if="agreementChecked" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <span class="agreement-text">
            接受<span class="link" @click.stop="showAgreementModal">用户协议</span>和<span
              class="link"
              @click.stop="showAgreementModal"
              >隐私政策</span
            >
          </span>
        </div>
      </div>
    </div>

    <div class="divider">
      <span class="divider-line"></span>
      <span class="divider-text">或者使用其他方式登录</span>
      <span class="divider-line"></span>
    </div>

    <div class="third-party">
      <button class="third-btn apple" @click="handleThirdParty('apple')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path
            d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.07-3.11-1.05.05-2.31.72-3.06 1.64-.68.84-1.28 2.18-1.12 3.13 1.19.09 2.39-.6 3.11-1.66"
          />
        </svg>
        <span>通过苹果登录</span>
      </button>
      <button class="third-btn google" @click="handleThirdParty('google')">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>通过Google登录</span>
      </button>
    </div>

    <!-- 协议弹窗 -->
    <AgreementModal v-if="showModal" @close="handleModalCancel" @agree="handleModalAgree" />
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #0d0d0d;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-width: 430px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #fff;
}

.title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin: 30px 0 40px;
  color: #fff;
}

.tab-container {
  display: flex;
  position: relative;
  margin-bottom: 30px;
  border-bottom: 1px solid #333;
}

.tab-btn {
  flex: 1;
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  padding: 12px 0;
  cursor: pointer;
  transition: color 0.3s;
}

.tab-btn.active {
  color: #fff;
  font-weight: 500;
}

.tab-btn.disabled {
  color: #444;
  cursor: pointer;
}

.tab-btn.disabled:hover {
  color: #666;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  width: 33.33%;
  height: 2px;
  background: #e53935;
  transition: left 0.3s ease;
}

.form-container {
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  align-items: center;
  background: #1a1a1a;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid #333;
  transition: border-color 0.3s;
}

.input-group:focus-within {
  border-color: #e53935;
}

.input-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.input-field {
  flex: 1;
  background: none;
  border: none;
  color: #fff;
  font-size: 14px;
  outline: none;
  min-width: 0;
}

.input-field::placeholder {
  color: #666;
}

.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.forgot-link {
  text-align: left;
  margin-bottom: 24px;
}

.forgot-link a {
  color: #666;
  font-size: 13px;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-link a:hover {
  color: #999;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 20px;
}

.login-btn:disabled {
  background: #f70202;
  color: #131212;
  cursor: not-allowed;
}

.login-btn:not(:disabled) {
  background: #e53935;
  color: #fff;
}

.login-btn:not(:disabled):hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.agreement-section {
  display: flex;
  justify-content: center;
}

.agreement-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  user-select: none;
}

.checkbox {
  display: none;
}

.check-icon {
  width: 16px;
  height: 16px;
  border: 1px solid #666;
  border-radius: 50%;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  flex-shrink: 0;
}

.check-icon.checked {
  background: #e53935;
  border-color: #e53935;
}

.link {
  color: #e53935;
  cursor: pointer;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  gap: 12px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: #333;
}

.divider-text {
  color: #666;
  font-size: 12px;
  white-space: nowrap;
}

.third-party {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.third-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 25px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.third-btn:hover {
  background: #2a2a2a;
  border-color: #444;
}

.third-btn.apple {
  background: #000;
  border-color: #333;
}

.third-btn.apple:hover {
  background: #111;
}

.third-btn.google {
  background: #1a1a1a;
}
</style>
