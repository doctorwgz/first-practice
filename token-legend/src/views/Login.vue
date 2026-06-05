<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import StatusBar from '../components/StatusBar.vue'
import request from '../utils/request.js'


const router = useRouter()

const tabs = ['密码登录', '手机号', '邮箱']
const activeTab = ref(0)

const form = reactive({
  jingwang_id: '',
  password: ''
})

const agreed = ref(false)
const showAgreement = ref(false) // 协议弹窗
const errorTip = ref('')
const loading = ref(false)

// 点击”登录”
function onLogin() {
  errorTip.value = ''
  // 1) 未勾选协议 → 弹窗
  if (!agreed.value) {
    showAgreement.value = true
    return
  }
  doLogin()
}

// 2) 调用后端登录接口
async function doLogin() {
  if (!form.jingwang_id.trim() || !form.password.trim()) {
    errorTip.value = '请输入精网号和密码'
    return
  }
  loading.value = true
  try {
    const data = await request.post('/auth/login', {
      jingwang_id: form.jingwang_id.trim(),
      password: form.password.trim(),
      agreed_policy: true
    })
    // 保存登录态
    localStorage.setItem('token', data.token)
    localStorage.setItem('dc_user', JSON.stringify(data.user))
    sessionStorage.setItem('from_login', '1')   // ← 标记从登录页进入
    router.replace('/home')
  } catch (err) {
    errorTip.value = err.message || '登录失败'
  } finally {
    loading.value = false
  }
}

// 协议弹窗:点击”同意” → 自动勾选并继续登录
function agreeAndContinue() {
  agreed.value = true
  showAgreement.value = false
  doLogin()
}

// 苹果 / Google 等其它按钮:跳转到404页面
function goPlaceholder() {
  router.push('/placeholder')
}


</script>

<template>
  <div class="screen login no-scrollbar">
    
    <StatusBar dark />

    <div class="login-body">
      <h1 class="title">登录 DeepChart</h1>

      <!-- 登录方式 tab -->
      <div class="tabs">
        <button
          v-for="(t, i) in tabs"
          :key="t"
          class="tab"
          :class="{ active: activeTab === i }"
          @click="i === 0 ? activeTab = i : goPlaceholder()"
        >
          {{ t }}
          <span v-if="activeTab === i" class="tab-line"></span>
        </button>
      </div>

      <!-- 表单 -->
      <div class="field">
        <span class="ic">👤</span>
        <input v-model="form.jingwang_id" placeholder="请输入精网号" />
      </div>
      <div class="field">
        <span class="ic">🔒</span>
        <input v-model="form.password" type="password" placeholder="请输入密码" />
      </div>

      <div class="forgot-row">
        <button class="link" @click="goPlaceholder">忘记 ID / 密码</button>
      </div>

      <p v-if="errorTip" class="error-tip">{{ errorTip }}</p>

      <button class="btn-login" :disabled="loading" @click="onLogin">
        {{ loading ? '登录中...' : '登 录' }}
      </button>

      <!-- 协议勾选 -->
      <label class="agree-row">
        <span class="checkbox" :class="{ checked: agreed }" @click.prevent="agreed = !agreed">
          <svg v-if="agreed" width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5 4 7.5 10 1" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="agree-text">
          接受<button class="link2" @click.prevent="goPlaceholder">用户协议</button>和<button class="link2" @click.prevent="goPlaceholder">隐私政策</button>
        </span>
      </label>

      <!-- 演示账号提示
      <div class="demo-hint" @click="fillDemo">
        演示账号:<b>90123456</b> / 密码:<b>123456</b> <span class="demo-fill">点此填入</span>
      </div> -->

      <div class="divider"><span>或者使用其他方式登录</span></div>

      <button class="btn-third apple" @click="goPlaceholder">
        <svg width="18" height="20" viewBox="0 0 17 20" fill="currentColor"><path d="M14.1 15.5c-.3.7-.6 1.3-1.1 1.9-.6.9-1.2 1.5-1.7 1.8-.5.3-1 .5-1.6.5-.4 0-.9-.1-1.5-.4-.6-.2-1.1-.4-1.5-.4-.5 0-1 .1-1.6.4-.6.2-1 .4-1.4.4-.6 0-1.1-.2-1.6-.6-.5-.4-1.1-1-1.7-2C2.2 16 1.7 14.6 1.4 13c-.3-1.7-.3-3.2.2-4.4.4-1 .9-1.7 1.7-2.3.8-.5 1.6-.8 2.4-.8.5 0 1.1.1 1.8.4.7.3 1.1.4 1.3.4.1 0 .6-.2 1.5-.5.8-.3 1.5-.4 2.1-.4 1.5.1 2.7.7 3.4 1.8-1.4.8-2 2-2 3.5 0 1.2.4 2.1 1.3 2.9.4.4.8.6 1.3.8-.1.3-.2.6-.3 1ZM11 1.6c0 .8-.3 1.6-.9 2.3-.7.8-1.5 1.3-2.4 1.2 0-.9.3-1.7.9-2.4.3-.4.7-.7 1.2-.9.4-.2.9-.3 1.2-.3v.1Z"/></svg>
        通过苹果登录
      </button>
      <button class="btn-third google" @click="goPlaceholder">
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.6 9.2c0-.6 0-1.2-.1-1.7H9v3.4h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.7-3.9 2.7-6.6Z"/><path fill="#34A853" d="M9 18c2.4 0 4.5-.8 6-2.2l-2.9-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.2-3.8H.8v2.3A9 9 0 0 0 9 18Z"/><path fill="#FBBC05" d="M3.8 10.7a5.4 5.4 0 0 1 0-3.4V5H.8a9 9 0 0 0 0 8l3-2.3Z"/><path fill="#EA4335" d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 .8 5l3 2.3C4.6 5.1 6.6 3.6 9 3.6Z"/></svg>
        通过 Google 登录
      </button>
    </div>

    <!-- ===== 协议弹窗 ===== -->
    <transition name="fade">
      <div v-if="showAgreement" class="mask" @click.self="showAgreement = false">
        <div class="agree-dialog">
          <p class="ad-text">
            登录前,请阅读并同意<b>《用户服务协议》</b>和<b>《用户隐私政策》</b>
          </p>
          <div class="ad-btns">
            <button class="ad-cancel" @click="showAgreement = false">取消</button>
            <button class="ad-ok" @click="agreeAndContinue">同意</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.login {
  background: linear-gradient(180deg, #15171c 0%, #0c0d11 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
}
.login-body {
  flex: 1;
  padding: 14px 26px 30px;
}
.title {
  font-size: 26px;
  font-weight: 800;
  margin: 30px 0 26px;
  letter-spacing: 0.5px;
}

.tabs {
  display: flex;
  gap: 26px;
  margin-bottom: 26px;
}
.tab {
  position: relative;
  font-size: 15px;
  color: #8b8f98;
  padding-bottom: 8px;
  font-weight: 500;
}
.tab.active {
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}
.tab-line {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 22px;
  height: 3px;
  border-radius: 2px;
  background: var(--brand-red);
}

.field {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 14px;
  background: #1d1f25;
  border-radius: 12px;
  margin-bottom: 14px;
  border: 1px solid #26282f;
}
.field .ic {
  font-size: 15px;
  opacity: 0.7;
}
.field input {
  flex: 1;
  color: #fff;
  font-size: 14px;
}
.field input::placeholder {
  color: #6b7080;
}

.forgot-row {
  text-align: right;
  margin-bottom: 14px;
}
.link {
  color: #8b8f98;
  font-size: 13px;
}
.error-tip {
  color: #ff6a6a;
  font-size: 13px;
  margin: -4px 0 12px;
}

.btn-login {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: linear-gradient(90deg, #ff4b5c, #f5394a);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 4px;
  box-shadow: 0 8px 20px rgba(245, 57, 74, 0.35);
}

.agree-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 2px 0;
  font-size: 12.5px;
  color: #9aa0ac;
}
.checkbox {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 1.5px solid #555a66;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.checkbox.checked {
  background: var(--brand-red);
  border-color: var(--brand-red);
}
.link2 {
  color: var(--brand-red);
  font-size: 12.5px;
}

.demo-hint {
  margin-top: 14px;
  font-size: 12px;
  color: #7a8090;
  background: #16181d;
  border: 1px dashed #2c2f37;
  border-radius: 8px;
  padding: 8px 10px;
  text-align: center;
}
.demo-hint b {
  color: #cfd3da;
}
.demo-fill {
  color: var(--brand-red);
  margin-left: 4px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 26px 0 18px;
  color: #6b7080;
  font-size: 12px;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #26282f;
}

.btn-third {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  background: #1d1f25;
  border: 1px solid #2c2f37;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 14px;
}

/* 协议弹窗 */
.mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 0 36px;
}
.agree-dialog {
  width: 100%;
  background: #fff;
  border-radius: 16px;
  padding: 26px 22px 0;
  overflow: hidden;
  color: #1a1d24;
}
.ad-text {
  font-size: 15px;
  line-height: 1.7;
  text-align: center;
  margin: 0 0 22px;
}
.ad-text b {
  color: var(--brand-red);
  font-weight: 600;
}
.ad-btns {
  display: flex;
  margin: 0 -22px;
  border-top: 1px solid var(--line);
}
.ad-cancel,
.ad-ok {
  flex: 1;
  height: 50px;
  font-size: 16px;
}
.ad-cancel {
  color: #8a93a6;
  border-right: 1px solid var(--line);
}
.ad-ok {
  color: var(--brand-red);
  font-weight: 700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
