<<template>
  <div class="home-page">
    <!-- Status Bar -->
    <div class="status-bar">
      <span class="status-time">9:41</span>
      <div class="status-icons">
        <svg width="16" height="12" viewBox="0 0 24 24" fill="#333"><path d="M1 16h2v4H1zm4-4h2v8H5zm4-4h2v12H9zm4-4h2v16h-2zm4-4h2v20h-2z"/></svg>
        <svg width="14" height="10" viewBox="0 0 24 24" fill="#333"><path d="M1 9l2-2 4 4 8-8 8 8v2H1z"/></svg>
        <svg width="22" height="11" viewBox="0 0 24 12" fill="none" stroke="#333" stroke-width="2"><rect x="1" y="1" width="18" height="10" rx="2"/><rect x="3" y="3" width="14" height="6" rx="1" fill="#333"/></svg>
      </div>
    </div>

    <div class="home-content" ref="scrollContainer">
      <!-- ========== 市场概览大卡片（包含机器人+对话框+地图） ========== -->
      <div class="market-section">
        <div class="market-card-bg">
          <!-- 头部区域：白色背景 + 机器人 + 对话框（作为一个整体） -->
          <div class="card-header-area">
            <!-- 白色背景图 —— 作为头部区域的背景，跟随内容自然流动 -->
            <img src="/white.png" class="white-bg-img" alt="" />
            
            <!-- 机器人+对话框区域 -->
            <div class="header-section">
              <div class="dialog-box">
                <div class="dialog-img" :style="dialogImgStyle">
                  <div class="dialog-scroll-wrapper">
                    <div class="dialog-scroll" :style="dialogScrollStyle">
                      <div v-for="(item, i) in dialogItems" :key="i" class="dialog-item">
                        <div class="dialog-line1">{{ item.line1 }}</div>
                        <div class="dialog-line2">{{ item.line2 }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img src="/sayHello.png" class="robot-img" alt="robot" />
            </div>

            <!-- 今日市场概览标题 -->
            <div class="section-header-market">
              <span class="section-title">今日市场概览</span>
              <img src="/globe.png" class="globe-icon" alt="" />
            </div>
          </div>
          
          <!-- 地图背景图 —— 放在头部区域下方，跟随滚动 -->
          <div class="map-area">
            <img src="/worldMap.png" class="world-map-img" alt="" />
            
            <!-- 指数标签层 -->
            <div class="market-bubbles">
              <div
                v-for="(item, idx) in marketData"
                :key="idx"
                class="market-bubble"
                :class="{ up: item.percent > 0, down: item.percent < 0 }"
                :style="bubblePositions[idx]"
                @click="goDefault"
              >
                <span class="bubble-dot"></span>
                <span class="bubble-name">{{ item.name }}</span>
                <span class="bubble-percent">
                  {{ item.percent > 0 ? '+' : '' }}{{ item.percent.toFixed(2) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DeepMate Section -->
      <div class="deepmate-section">
        <div class="deepmate-header">
          <img src="/deepmate_logo.png" class="deepmate-icon" alt="deepmate" />
          <span class="deepmate-title">DeepMate: Stocks AI Assistant</span>
        </div>
        <div class="deepmate-cards">
          <!-- 机构猎手 -->
          <div class="deepmate-card" @click="goDefault">
            <div class="card-title">
              <span class="card-title-text">机构猎手</span>
              <span class="title-dot"></span>
              <span class="badge">🔥</span>
            </div>
            <div class="scroll-text-wrapper">
              <div class="scroll-text-container">
                <div class="scroll-text-track" :style="hunterScrollStyle">
                  <span v-for="(text, i) in hunterTexts" :key="i" class="hunter-text-item">
                    {{ text }}
                  </span>
                </div>
              </div>
            </div>
            <div class="stock-list">
              <div v-for="(stock, i) in stocks" :key="i" class="stock-item">
                <span class="stock-name">{{ stock.name }}</span>
                <span class="stock-pct" :class="stock.pct > 0 ? 'up' : 'down'">
                  {{ stock.pct > 0 ? '+' : '' }}{{ stock.pct }}%
                </span>
              </div>
            </div>
          </div>
          <!-- AI诊股 -->
          <div class="deepmate-card ai-card" @click="goDefault">
            <div class="card-title">
              <span class="card-title-text">AI诊股</span>
              <span class="title-dot"></span>
              <span class="badge">🔥</span>
            </div>
            <img src="/AIzhengu.png" class="ai-icon" alt="ai" />
            <div class="ai-desc">深度机构行为分析<br/>揭秘资金背后的真相</div>
          </div>
        </div>
      </div>

      <!-- Deep Explore -->
      <div class="explore-section">
        <div class="section-header">
          <span class="section-title">深度探索</span>
          <span class="more-btn" @click="goDefault">查看更多</span>
        </div>
        <div class="explore-scroll">
          <div
            v-for="tpl in templates"
            :key="tpl.id"
            class="explore-item"
            @click="goDefault"
          >
            <div class="explore-icon" :style="{ background: tpl.color }">
              <img :src="tpl.icon" alt="" />
            </div>
            <span class="explore-name">{{ tpl.name }}</span>
          </div>
        </div>
      </div>

      <!-- My Watchlist -->
      <div class="watchlist-section">
        <div class="section-header">
          <span class="section-title">我的自选</span>
          <span class="add-btn" @click="goDefault">添加自选股</span>
        </div>
        <div class="watchlist-cards">
          <div v-for="(w, i) in watchlist" :key="i" class="watch-card" @click="goDefault">
            <div class="watch-name">{{ w.name }} ({{ w.code }})</div>
            <div class="watch-price" :class="w.change > 0 ? 'up' : 'down'">{{ w.price }}</div>
            <div class="watch-chart">
              <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                <polyline
                  :points="w.chartPoints"
                  fill="none"
                  :stroke="w.change > 0 ? '#e53935' : '#00c853'"
                  stroke-width="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Institution Brief -->
      <div class="institution-section">
        <div class="section-header">
          <span class="section-title-red">机构动向简报</span>
        </div>
        <div class="inst-list">
          <div v-for="(inst, i) in institutions" :key="i" class="inst-item" @click="goDefault">
            <span class="inst-tag">{{ inst.name }}</span>
            <span class="inst-text">{{ inst.text }}</span>
          </div>
        </div>
        <div class="inst-more" @click="goDefault">查看更多>></div>
      </div>

      <!-- AI Disclaimer -->
      <div class="ai-disclaimer">
        以上数据由AI生成,不构成投资建议!
      </div>

      <!-- AI Prompt / Search -->
      <div class="ai-prompt">
        <div class="prompt-box">
          <img src="/sayHello.png" class="prompt-robot" alt="" />
          <input
            v-model="searchText"
            class="prompt-input"
            placeholder="搜索或提问试一试~"
            maxlength="20"
          />
          <img src="/send.png" class="prompt-send" alt="" @click="handleSearch" />
        </div>
      </div>

      <!-- Bottom padding for nav -->
      <div class="bottom-padding"></div>
    </div>

    <!-- Activity Popup -->
    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <img src="/popup.png" class="popup-img" alt="popup" @click="goLeaderboard" />
      </div>
    </div>

    <!-- Bottom Nav -->
    <div class="bottom-nav">
      <div class="nav-item active">
        <img src="/首页.png" class="nav-icon" alt="首页" />
        <span>首页</span>
      </div>
      <div class="nav-item" @click="goDefault">
        <img src="/行情.png" class="nav-icon" alt="行情" />
        <span>行情</span>
      </div>
      <div class="nav-item nav-center" @click="goDefault">
        <div class="center-circle">
          <img src="/deepmate_logo.png" alt="" />
        </div>
        <span>DeepMate</span>
      </div>
      <div class="nav-item" @click="goDefault">
        <img src="/探索.png" class="nav-icon" alt="深度探索" />
        <span>深度探索</span>
      </div>
      <div class="nav-item" @click="goDefault">
        <img src="/我的.png" class="nav-icon" alt="我的" />
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import request from '@/utils/request'

const router = useRouter()
const userStore = useUserStore()

const showPopup = ref(false)
const searchText = ref('')
const marketData = ref([])
const templates = ref([])
const dialogIndex = ref(0)
const hunterIndex = ref(0)

// 机器人对话框文案（每隔2s向上滚动，每次只显示一条）
const dialogItems = [
  { line1: 'HI!你好!', line2: '欢迎来到DeepChart!' },
  { line1: '新用户注册', line2: '立享100Token+深度能量1个月' },
  { line1: '免费体验', line2: '深度机构六大模板七天!' }
]

// 机构猎手滚动文案（每隔3s向右滚动）
const hunterTexts = [
  'AI追踪市场机构动向，以下股票值得关注',
  '机构资金持续流入，关注主力动向',
  '智能挖掘机构重仓潜力股'
]

// 假数据 - 11个指数（顺序与 bubblePositions 一一对应）
const marketNames = [
  '加拿大S&P', '道琼斯', '纳斯达克', '标普500', '上证指数',
  '恒生指数', 'VNINDEX', 'SET', '印尼雅加达综合', '富时马来西亚KLCI', '富时新加坡海峡时报'
]

// 每个指数的位置（基于百分比，对应地图上的位置）
const bubblePositions = [
  { top: '1%', left: '40%' },   // 加拿大S&P
  { top: '15%', left: '15%' },    // 道琼斯
  { top: '28%', left: '20%' },    // 纳斯达克
  { top: '40%', left: '15%' },   // 标普500
  { top: '15%', left: '80%' },   // 上证指数
  { top: '28%', left: '78%' },   // 恒生指数
  { top: '40%', left: '50%' },   // VNINDEX
  { top: '42%', left: '82%' },   // SET
  { top: '60%', left: '72%' },   // 印尼雅加达综合
  { top: '75%', left: '65%' },   // 富时马来西亚KLCI
  { top: '68%', left: '85%' },   // 富时新加坡海峡时报
]

const stocks = ref([
  { name: '曼恩斯特', pct: 2.99 },
  { name: '恒兴新材', pct: -0.45 },
  { name: '红四方', pct: -0.67 }
])

const watchlist = ref([
  { name: '特斯拉', code: 'TSLA', price: '432.230', change: 2.92, chartPoints: '0,25 10,20 20,22 30,18 40,15 50,12 60,14 70,10 80,8 90,5 100,3' },
  { name: '英伟达', code: 'NVDA', price: '189.900', change: -2.82, chartPoints: '0,5 10,8 20,12 30,15 40,18 50,20 60,22 70,25 80,28 90,26 100,30' },
  { name: '苹果', code: 'AAPL', price: '256.830', change: 2.92, chartPoints: '0,20 10,18 20,22 30,15 40,12 50,10 60,8 70,12 80,15 90,10 100,5' }
])

const institutions = ref([
  { name: '特斯拉', text: '当前市场多头资金占优，资金持续流入。当前市场多头资金占优，资金持续流入。' },
  { name: '英伟达', text: '当前市场多头资金占优，资金持续流入。当前市场多头资金占优，资金持续流入。' },
  { name: '苹果', text: '当前市场多头资金占优，资金持续流入。当前市场多头资金占优，资金持续流入。' }
])

const exploreItems = [
  { id: 1, name: '游资模板', icon: '/jigoulieshou.png', color: '#e53935' },
  { id: 2, name: '游庄模板', icon: '/youzhuang.png', color: '#5e35b1' },
  { id: 3, name: '主力模板', icon: '/zhuli.png', color: '#1e88e5' },
  { id: 4, name: '机构模板', icon: '/jigou.png', color: '#43a047' },
  { id: 5, name: '极限模板', icon: '/jixian.png', color: '#fb8c00' },
  { id: 6, name: 'AI选股', icon: '/AIzhengu.png', color: '#e53935' },
  { id: 7, name: '智能盯盘', icon: '/DeepMate.png', color: '#1e88e5' }
]

let dialogTimer = null
let hunterTimer = null
let popupTimer = null

// 对话框背景图样式
const dialogImgStyle = computed(() => ({
  backgroundImage: 'url(/dialog.png)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  position: 'relative',
  overflow: 'hidden'
}))

// 对话框滚动样式：每次只显示一条（两行），向上滚动
const dialogScrollStyle = computed(() => ({
  transform: `translateY(-${dialogIndex.value * 100}%)`,
  transition: 'transform 0.5s ease'
}))

// 机构猎手滚动样式
const hunterScrollStyle = computed(() => ({
  transform: `translateX(-${hunterIndex.value * 100}%)`,
  transition: 'transform 0.5s ease'
}))

onMounted(() => {
  // 生成市场假数据
  marketData.value = marketNames.map(name => ({
    name,
    price: 3000 + Math.random() * 5000,
    change: (Math.random() - 0.5) * 50,
    percent: (Math.random() - 0.5) * 3
  }))

  templates.value = exploreItems

  // 机器人对话框：每隔2s向上滚动，每次只显示一条
  dialogTimer = setInterval(() => {
    dialogIndex.value = (dialogIndex.value + 1) % dialogItems.length
  }, 2000)

  // 机构猎手：每隔3s向右滚动
  hunterTimer = setInterval(() => {
    hunterIndex.value = (hunterIndex.value + 1) % hunterTexts.length
  }, 3000)

  // 弹窗展示（仅会员）
  const userType = userStore.user?.user_type
  if (userType === 1) {
    popupTimer = setTimeout(() => {
      showPopup.value = true
    }, 1500)
  }

  // 记录访问
  request.post('/activity/visit', { page: 'home' }).catch(() => {})
})

onUnmounted(() => {
  clearInterval(dialogTimer)
  clearInterval(hunterTimer)
  clearTimeout(popupTimer)
})

function goDefault() {
  router.push('/default')
}

function goLeaderboard() {
  showPopup.value = false
  router.push('/leaderboard')
}

function closePopup() {
  showPopup.value = false
}

function handleSearch() {
  if (!searchText.value.trim()) return
  router.push('/default')
}
</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #fff5f5 0%, #ffffff 30%);
  position: relative;
  overflow: hidden;
}

.home-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 80px;
  -webkit-overflow-scrolling: touch;
}

/* ========== Status Bar ========== */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 8px;
  background: transparent;
}

.status-time {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  letter-spacing: 0.5px;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ========== Market Section（大卡片容器） ========== */
.market-section {
  padding: 0 16px 12px;
  background: #fff5f5;
}

.market-card-bg {
  position: relative;
  border-radius: 16px;
  background: transparent;
  overflow: hidden;
}

/* ========== 头部区域：白色背景 + 机器人 + 标题（作为一个整体流式布局） ========== */
.card-header-area {
  position: relative;
  padding-top: 30px;    /* 顶部留一点间距 */
}

/* 白色背景图 —— 相对定位，跟随文档流自然滚动，上方留出缺口 */
.white-bg-img {
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: top;
  z-index: 2;
  pointer-events: none;
}

/* ========== Header with Robot Dialog ========== */
.header-section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 12px;
  position: relative;
  z-index: 1;
}

/* 1. 缩进机器人和对话框中间的距离 */
.dialog-box {
  flex: 0 0 auto;
  margin-right: 0px;
  height: 80px;
}

.dialog-img {
  overflow: hidden;
}

.dialog-scroll-wrapper {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
}

.dialog-scroll {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.dialog-item {
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
}

.dialog-line1 {
  color: #db1f1d;
  font-family: "PingFang SC";
  font-size: 20px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px;
}

.dialog-line2 {
  color: #333333;
  font-family: "PingFang SC";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 14px;
}

/* 机器人图片 */
.robot-img {
  width: 115.01px;
  height: 119.72px;
  aspect-ratio: 83 / 92;
  object-fit: contain;
  flex-shrink: 0;
  margin-top: 0;
  position: relative;
  top: 15px;
  margin-left: 20px;   /* 左移，卡在 white 缺口处 */
  z-index: 0;
}

/* ========== Market Header（今日市场概览标题） ========== */
.section-header-market {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  margin-top: 4px;      /* 与机器人区域紧凑衔接 */
  margin-bottom: 8px;
  padding: 0 16px;
}

.section-header-market .section-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.globe-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  position: relative;
  top: -2px;
}

/* ========== 地图区域（与头部一起滚动） ========== */
.map-area {
  position: relative;
  width: 100%;
  height: 220px;
  padding: 0 8px 12px;
}

/* 地图背景图 —— 相对定位，跟随文档流滚动 */
.world-map-img {
  position: absolute;
  top: -60px;
  left: 5%;
  width: 95%;
  height: 100%;
  object-fit: contain;
  opacity: 0.15;
  pointer-events: none;
  z-index: 3;
}

/* 指数气泡层 */
.market-bubbles {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 4;  /* ← 高于 world-map-img (z-index: 3)，气泡显示在地图之上 */
}

.market-bubble {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 4px 8px;
  border-radius: 10px;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  font-size: 10px;
  white-space: nowrap;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: all 0.2s;
}

.market-bubble:active {
  transform: translate(-50%, -50%) scale(0.95);
}

.bubble-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.market-bubble.up { color: #e53935; }
.market-bubble.up .bubble-dot { background: #e53935; }

.market-bubble.down { color: #00c853; }
.market-bubble.down .bubble-dot { background: #00c853; }

.bubble-name { font-weight: 500; }
.bubble-percent { font-weight: 600; }

/* DeepMate Section */
.deepmate-section {
  padding: 12px 16px;
  background: #fff5f5;
}

.deepmate-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.deepmate-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.deepmate-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.deepmate-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.deepmate-card {
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  cursor: pointer;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.badge {
  font-size: 12px;
}

/* 机构猎手滚动 */
.scroll-text-wrapper {
  overflow: hidden;
  height: 20px;
  margin-bottom: 8px;
}

.scroll-text-container {
  width: 100%;
  height: 20px;
  overflow: hidden;
  position: relative;
}

.scroll-text-track {
  display: flex;
  height: 100%;
  width: fit-content;
}

.hunter-text-item {
  height: 20px;
  line-height: 20px;
  font-size: 11px;
  color: #888;
  white-space: nowrap;
  padding-right: 20px;
  flex-shrink: 0;
  min-width: 100%;
}

.stock-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.stock-name { color: #333; }
.stock-pct.up { color: #e53935; }
.stock-pct.down { color: #00c853; }

/* AI诊股 */
.ai-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.ai-icon {
  width: 50px;
  height: 50px;
  margin: 8px 0;
}

.ai-desc {
  font-size: 11px;
  color: #888;
  line-height: 1.5;
}

/* Explore Section */
.explore-section {
  padding: 12px 16px;
  background: #fff5f5;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.more-link {
  font-size: 12px;
  color: #e53935;
  cursor: pointer;
}

.explore-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}

.explore-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 60px;
  cursor: pointer;
}

.explore-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.explore-icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.explore-name {
  font-size: 11px;
  color: #333;
}

/* Watchlist */
.watchlist-section {
  padding: 12px 16px;
  background: #fff5f5;
}

.add-btn {
  font-size: 11px;
  color: #fff;
  background: #e53935;
  padding: 4px 10px;
  border-radius: 10px;
  cursor: pointer;
}

.watchlist-cards {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.watch-card {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  min-width: 140px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  cursor: pointer;
}

.watch-name {
  font-size: 12px;
  color: #333;
  font-weight: 500;
}

.watch-price {
  font-size: 16px;
  font-weight: 600;
  margin: 6px 0;
}

.watch-price.up { color: #e53935; }
.watch-price.down { color: #00c853; }

.watch-chart {
  width: 100%;
  height: 30px;
}

.watch-chart svg {
  width: 100%;
  height: 100%;
}

/* Institution */
.institution-section {
  padding: 16px;
  background: #ffffff;
}

.section-title-red {
  font-size: 16px;
  font-weight: 700;
  color: #e53935;
  border-left: 4px solid #e53935;
  padding-left: 10px;
}

.inst-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.inst-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: #fff5f5;
  padding: 12px 14px;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid #ffebee;
}

.inst-tag {
  font-size: 12px;
  color: #fff;
  background: linear-gradient(135deg, #e53935 0%, #c62828 100%);
  padding: 3px 10px;
  border-radius: 6px;
  white-space: nowrap;
  font-weight: 600;
}

.inst-text {
  font-size: 13px;
  color: #555;
  line-height: 1.5;
}

.inst-more {
  text-align: center;
  font-size: 12px;
  color: #e53935;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
}

/* AI Disclaimer */
.ai-disclaimer {
  text-align: center;
  font-size: 11px;
  color: #999;
  padding: 12px 16px;
  background: #ffffff;
}

/* AI Prompt / Search */
.ai-prompt {
  padding: 16px;
  background: #ffffff;
}

.prompt-box {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 28px;
  padding: 10px 18px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid #f0f0f0;
}

.prompt-robot {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  flex-shrink: 0;
}

.prompt-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;
}

.prompt-input::placeholder {
  color: #999;
}

.prompt-send {
  width: 26px;
  height: 26px;
  opacity: 0.6;
  cursor: pointer;
  flex-shrink: 0;
}

.bottom-padding {
  height: 90px;
}

/* Popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-align: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.popup-content {
  animation: popupIn 0.3s ease;
}

.popup-img {
  width: 280px;
  height: auto;
  cursor: pointer;
}

@keyframes popupIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

/* Bottom Nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 6px 12px;
}

.nav-item span {
  font-size: 11px;
  color: #888;
  font-weight: 500;
}

.nav-item.active span {
  color: #e53935;
}

.nav-center {
  position: relative;
  top: -20px;
}

.center-circle {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #e53935 0%, #c62828 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #fff;
  box-shadow: 0 4px 16px rgba(229, 57, 53, 0.3);
}

.center-circle img {
  width: 32px;
  height: 32px;
}

/* ========== Card Title Dot ========== */
.card-title-text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.title-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e53935;
  margin-left: 4px;
}

/* ========== More Button ========== */
.more-btn {
  font-size: 11px;
  color: #fff;
  background: #e53935;
  padding: 3px 10px;
  border-radius: 10px;
  cursor: pointer;
}

/* ========== Bottom Nav Icons ========== */
.nav-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.nav-item.active .nav-icon {
  filter: brightness(0) saturate(100%) invert(29%) sepia(98%) saturate(4023%) hue-rotate(348deg) brightness(92%) contrast(96%);
}
</style>