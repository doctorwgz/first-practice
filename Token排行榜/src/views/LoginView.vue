<<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Close button -->
      <div class="close-btn" @click="goHome">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>

      <!-- Title -->
      <div class="title-section">
        <h1 class="main-title">登录DeepChart</h1>
      </div>

      <!-- Tab switcher -->
      <div class="tab-section">
        <span class="tab active">密码登录</span>
        <span class="tab">手机号</span>
        <span class="tab">邮箱</span>
      </div>

      <!-- Form -->
      <div class="form-section">
        <div class="input-group">
          <div class="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <input
            v-model="form.jingwang_id"
            type="text"
            placeholder="请输入DeepChart ID/手机号/邮箱"
            maxlength="8"
          />
        </div>

        <div class="input-group">
          <div class="input-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </div>

        <!-- 忘记ID/密码 - 跳转到404 -->
        <div class="forgot-link" @click="goDefault">忘记ID/密码</div>

        <!-- Login button -->
        <button class="login-btn" @click="handleLoginClick" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <!-- Agreement - 可点击勾选 -->
        <div class="agreement-section" @click="toggleAgreement">
          <div class="checkbox-wrapper">
            <div class="checkbox" :class="{ checked: agreed }">
              <svg v-if="agreed" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="agreement-text">
              接受<span class="link" @click.stop="goDefault">用户协议</span>和<span class="link" @click.stop="goDefault">隐私政策</span>
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text">或者使用其他方式登录</span>
          <span class="divider-line"></span>
        </div>

        <!-- Social login - 跳转到404，返回登录页 -->
        <div class="social-login">
          <button class="social-btn apple" @click="goDefault">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.98 1.08-3.11-1.05.05-2.31.7-3.06 1.56-.67.78-1.26 2.02-1.1 3.13 1.17.09 2.37-.6 3.08-1.58z"/>
            </svg>
            <span>通过苹果登录</span>
          </button>
          <button class="social-btn google" @click="goDefault">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>通过Google登录</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Agreement Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-body">
          <p class="modal-text">
            登录前，请阅读并同意<span class="highlight">《用户服务协议》</span>和<span class="highlight">《用户隐私政策》</span>
          </p>
        </div>
        <div class="modal-footer">
          <button class="modal-btn cancel" @click="closeModal">取消</button>
          <button class="modal-btn confirm" @click="confirmAgreement">同意</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast.show" class="toast">{{ toast.message }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import request from '@/utils/request'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  jingwang_id: '',
  password: '',
  agreed_policy: false
})

const agreed = ref(false)
const showModal = ref(false)
const loading = ref(false)
const toast = reactive({ show: false, message: '' })

function showToast(msg) {
  toast.message = msg
  toast.show = true
  setTimeout(() => { toast.show = false }, 2500)
}

// 单独点击勾选/取消协议
function toggleAgreement() {
  agreed.value = !agreed.value
  form.agreed_policy = agreed.value
}

// 跳转到404页面
function goDefault() {
  router.push('/notfound')
}

// 点击登录按钮时触发
function handleLoginClick() {
  if (!form.jingwang_id || !form.password) {
    showToast('请输入账号和密码')
    return
  }

  // 未勾选协议时，弹出协议弹窗
  if (!agreed.value) {
    showModal.value = true
    return
  }

  // 已勾选，直接登录
  doLogin()
}

// 用户点击弹窗"同意"按钮
function confirmAgreement() {
  agreed.value = true
  form.agreed_policy = true
  showModal.value = false
  // 自动执行登录
  doLogin()
}

function closeModal() {
  showModal.value = false
}

async function doLogin() {
  loading.value = true
  try {
    const data = await request.post('/auth/login', {
      jingwang_id: form.jingwang_id,
      password: form.password,
      agreed_policy: true
    })

    // 记录登录用户数据到 Pinia store + localStorage
    userStore.setToken(data.token)
    userStore.setUser(data.user)
    showToast('登录成功')

    // Fetch profile
    const profile = await request.get('/user/profile')
    userStore.setProfile(profile)

    // Record visit
    request.post('/activity/visit', { page: 'login' }).catch(() => {})

    setTimeout(() => {
      router.push('/home')
    }, 500)
  } catch (err) {
    showToast(err.message || '登录失败')
  } finally {
    loading.value = false
  }
}

// 关闭按钮：跳转到首页（确保能跳转）
function goHome() {
  router.push('/home')
}
</script>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  background: #1a1a1a;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 0 24px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.title-section {
  text-align: center;
  margin-bottom: 32px;
}

.main-title {
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 1px;
}

.tab-section {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.tab {
  color: #888;
  font-size: 14px;
  cursor: pointer;
  padding-bottom: 4px;
  position: relative;
}

.tab.active {
  color: #fff;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e53935;
  border-radius: 1px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  align-items: center;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 0 14px;
  height: 48px;
  border: 1px solid #333;
}

.input-icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.input-group input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 14px;
}

.input-group input::placeholder {
  color: #666;
}

.forgot-link {
  color: #888;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}

.login-btn {
  width: 100%;
  height: 48px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.agreement-section {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 1px solid #666;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.checkbox.checked {
  background: #e53935;
  border-color: #e53935;
}

.agreement-text {
  color: #888;
  font-size: 12px;
}

.agreement-text .link {
  color: #e53935;
  cursor: pointer;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0;
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

.social-login {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 44px;
  border-radius: 22px;
  border: none;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
}

.social-btn.apple {
  background: #000;
  border: 1px solid #333;
}

.social-btn.google {
  background: #000;
  border: 1px solid #333;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  animation: popupIn 0.2s ease;
}

.modal-body {
  padding: 28px 24px 20px;
}

.modal-text {
  color: #333;
  font-size: 14px;
  line-height: 1.7;
  text-align: center;
}

.modal-text .highlight {
  color: #1e88e5;
}

.modal-footer {
  display: flex;
  padding: 0 24px 24px;
  gap: 12px;
}

.modal-btn {
  flex: 1;
  height: 48px;
  border-radius: 24px;
  border: none;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.modal-btn.cancel {
  background: #f5f5f5;
  color: #bbb;
}

.modal-btn.confirm {
  background: #000;
  color: #fff;
}

.modal-btn:active {
  opacity: 0.8;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 2000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(10px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes popupIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>