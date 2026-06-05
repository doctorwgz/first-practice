<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'

const router = useRouter()
const activeTab = ref('home')

// 滚动文案
const scrollTexts = [
  'Hi！你好！欢迎来到DeepChart！',
  '新用户注册立享100Token+深度能量1个月',
  '并可免费使用深度机构六大模板七天！',
]

const fetchLeaderboard = async () => {
  try {
    const res: any = await request.get('/leaderboard?page=1&size=10')
    leaderboard.value = res.data || []
  } catch (error) {
    console.error('获取排行榜失败', error)
  }
}
const leaderboard = ref([])

const currentTextIndex = ref(0)
let scrollTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const userData = localStorage.getItem('deepchart_user')
  if (!userData) {
    router.push('/')
    return
  }

  // 启动文案滚动，每2秒切换
  scrollTimer = setInterval(() => {
    currentTextIndex.value = (currentTextIndex.value + 1) % scrollTexts.length
  }, 2000)
})

onUnmounted(() => {
  if (scrollTimer) {
    clearInterval(scrollTimer)
  }
})

const goToMissing = () => {
  router.push('/missing')
}

// 市场数据
const marketData = [
  { name: '加拿大S&P', value: '-0.07%', up: false },
  { name: '上证指数', value: '-0.07%', up: false },
  { name: '道琼斯', value: '-0.07%', up: false },
  { name: '恒生指数', value: '-0.07%', up: false },
  { name: '纳斯达克', value: '-0.07%', up: false },
  { name: 'VNINDEX', value: '-0.07%', up: false },
  { name: 'SET', value: '-0.07%', up: false },
  { name: '标普500', value: '-0.07%', up: false },
  { name: '印尼雅加达综合', value: '-0.07%', up: false },
  { name: '富时马来西亚KLCI', value: '-0.07%', up: false },
  { name: '富时新加坡海峡时报', value: '-0.07%', up: false },
]

// 机构猎手
const hunterStocks = [
  { name: '曼恩斯特', change: '+2.99%', up: true },
  { name: '恒兴新材', change: '-0.45%', up: false },
  { name: '红四方', change: '-0.67%', up: false },
]

// 深度探索
const exploreItems = [
  { name: '游资模板', icon: '💰' },
  { name: '游庄模板', icon: '🏛️' },
  { name: '主力模板', icon: '📈' },
  { name: '机构模板', icon: '📋' },
  { name: '极限', icon: '☀️' },
]

// 自选股
const watchList = [
  { name: '特斯拉', code: 'TSLA', price: '432.230', change: '+2.92%', up: true },
  { name: '英伟达', code: 'NVDA', price: '189.900', change: '-2.92%', up: false },
  { name: '苹果', code: 'AAPL', price: '256.830', change: '+2.92%', up: true },
]

// 机构动向简报
const briefList = [
  {
    tag: '特斯拉',
    content: '当前市场多头资金占优，资金持续流入。当前市场多头资金占优，资金持续流入。',
  },
  {
    tag: '英伟达',
    content: '当前市场多头资金占优，资金持续流入。当前市场多头资金占优，资金持续流入。',
  },
  {
    tag: '苹果',
    content: '当前市场多头资金占优，资金持续流入。当前市场多头资金占优，资金持续流入。',
  },
]

const navItems = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'market', label: '行情', icon: '📊' },
  { key: 'ai', label: 'DeepMate', icon: 'ai' },
  { key: 'explore', label: '深度探索', icon: '🔍' },
  { key: 'profile', label: '我的', icon: '👤' },
]
</script>

<template>
  <div class="home-page">
    <!-- 顶部状态栏区域（时间、信号等） -->
    <div class="status-bar">
      <span class="time">9:41</span>
      <div class="status-icons">
        <span>📶</span>
        <span>📡</span>
        <span>🔋</span>
      </div>
    </div>

    <!-- 欢迎区 -->
    <div class="welcome-section">
      <!-- 白色对话框 -->
      <div class="chat-bubble">
        <h1 class="welcome-title">HI!你好！</h1>
        <div class="scroll-text-container">
          <p class="scroll-text" :key="currentTextIndex">{{ scrollTexts[currentTextIndex] }}</p>
        </div>
      </div>
      <!-- 机器人图片 -->
      <div class="robot-placeholder">
        <img src="../images/机器人.png" alt="robot" />
      </div>
    </div>

    <!-- 今日市场概览 -->
    <div class="section-card market-section">
      <div class="section-header">
        <h2 class="section-title">今日市场概览</h2>
        <span class="globe-icon">🌍</span>
      </div>
      <!-- 世界地图背景占位 -->
      <div class="market-map">
        <!-- <img src="world-map.png" alt="map" /> -->
        <div class="map-placeholder"></div>
        <div class="market-tags">
          <span
            v-for="(item, idx) in marketData"
            :key="idx"
            class="market-tag"
            :class="item.up ? 'up' : 'down'"
          >
            {{ item.name }} {{ item.value }}
          </span>
        </div>
      </div>
    </div>

    <!-- DeepMate AI Assistant -->
    <div class="section-card deepmate-section">
      <div class="deepmate-header">
        <div class="deepmate-icon">🤖</div>
        <span class="deepmate-title">DeepMate: Stocks AI Assistant</span>
      </div>
      <div class="deepmate-body">
        <!-- 左侧：机构猎手 -->
        <div class="feature-card hunter-card">
          <div class="feature-header">
            <span class="feature-name">机构猎手</span>
            <span class="feature-icon">🎯</span>
            <span class="arrow">›</span>
          </div>
          <p class="feature-desc">AI追踪市场机构动向，以下股票值得关注</p>
          <div class="stock-list">
            <div v-for="(stock, idx) in hunterStocks" :key="idx" class="stock-row">
              <span class="stock-name">{{ stock.name }}</span>
              <span class="stock-change" :class="stock.up ? 'up' : 'down'">{{ stock.change }}</span>
            </div>
          </div>
          <!-- 分页点 -->
          <div class="dots">
            <span class="dot active"></span>
            <span class="dot"></span>
          </div>
        </div>

        <!-- 右侧：AI诊股 -->
        <div class="feature-card ai-card">
          <div class="feature-header">
            <span class="feature-name">AI诊股</span>
            <span class="feature-icon">🔍</span>
            <span class="arrow">›</span>
          </div>
          <!-- 机器人图片占位 -->
          <div class="ai-robot-placeholder">
            <!-- <img src="ai-robot.png" alt="ai robot" /> -->
            <div class="placeholder-box small">🤖</div>
          </div>
          <p class="ai-desc">深度机构行为分析</p>
          <p class="ai-sub">揭秘资金背后的真相</p>
        </div>
      </div>
    </div>

    <!-- 深度探索 -->
    <div class="section-card explore-section">
      <div class="section-header">
        <h2 class="section-title">深度探索</h2>
        <span class="more-btn" @click="goToMissing">查看更多</span>
      </div>
      <div class="explore-list">
        <div
          v-for="(item, idx) in exploreItems"
          :key="idx"
          class="explore-item"
          @click="goToMissing"
        >
          <div class="explore-icon">{{ item.icon }}</div>
          <span class="explore-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <!-- 我的自选 -->
    <div class="section-card watch-section">
      <div class="section-header">
        <h2 class="section-title">我的自选</h2>
        <span class="add-btn" @click="goToMissing">添加自选股</span>
      </div>
      <div class="watch-grid">
        <div v-for="(stock, idx) in watchList" :key="idx" class="watch-card" @click="goToMissing">
          <div class="watch-header">
            <span class="watch-name">{{ stock.name }}</span>
            <span class="watch-code">({{ stock.code }})</span>
          </div>
          <div class="watch-price" :class="stock.up ? 'up' : 'down'">
            <span class="price">{{ stock.price }}</span>
            <span class="change">{{ stock.change }}</span>
          </div>
          <!-- 走势图占位 -->
          <div class="chart-placeholder">
            <!-- <img src="chart.png" alt="chart" /> -->
            <svg class="sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
              <polyline
                :points="
                  stock.up
                    ? '0,25 20,20 40,22 60,15 80,18 100,5'
                    : '0,5 20,10 40,8 60,15 80,12 100,25'
                "
                fill="none"
                :stroke="stock.up ? '#00C853' : '#FF5252'"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 机构动向简报 -->
    <div class="section-card brief-section">
      <div class="section-header">
        <h2 class="section-title with-bar">机构动向简报</h2>
      </div>
      <div class="brief-list">
        <div v-for="(item, idx) in briefList" :key="idx" class="brief-item">
          <span class="brief-tag">{{ item.tag }}</span>
          <p class="brief-content">{{ item.content }}</p>
        </div>
      </div>
      <div class="more-link" @click="goToMissing">查看更多>></div>
    </div>

    <!-- 免责声明 -->
    <p class="disclaimer">以上数据由AI生成，不构成投资建议！</p>

    <!-- AI搜索框 -->
    <div class="ai-search-bar" @click="goToMissing">
      <div class="search-robot">🤖</div>
      <span class="search-text">搜索或提问试一试~</span>
      <div class="search-send">➤</div>
    </div>

    <!-- 底部导航 -->
    <div class="bottom-nav">
      <div
        v-for="item in navItems"
        :key="item.key"
        class="nav-item"
        :class="{ active: activeTab === item.key }"
        @click="item.key === 'home' ? (activeTab = item.key) : goToMissing()"
      >
        <div v-if="item.icon === 'ai'" class="nav-ai-icon">
          <span>AI</span>
        </div>
        <span v-else class="nav-icon">{{ item.icon }}</span>
        <span class="nav-label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffe4e1 0%, #fff0f0 8%, #f8f8f8 100%);
  padding: 0 16px;
  padding-bottom: 100px;
  max-width: 430px;
  margin: 0 auto;
  position: relative;
}

/* 状态栏 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 4px 4px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.status-icons {
  display: flex;
  gap: 4px;
  font-size: 12px;
}

/* 欢迎区 */
.welcome-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 16px 40px;
  margin: 0 -16px 12px;
  background: linear-gradient(180deg, #ff6b6b 0%, #ff8e8e 40%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.chat-bubble {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 22px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  max-width: 220px;
  position: relative;
}

/* 对话框右侧小三角 */
.chat-bubble::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid #ffffff;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.welcome-title {
  font-size: 24px;
  font-weight: 800;
  color: #e53935;
  line-height: 1.2;
  margin: 0 0 6px 0;
}

.scroll-text-container {
  overflow: hidden;
  height: 20px;
}

.scroll-text {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 20px;
  transition: opacity 0.3s ease;
}

.robot-placeholder {
  width: 130px;
  height: 140px;
  flex-shrink: 0;
  margin-top: 8px;
}

.robot-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.placeholder-box {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.placeholder-box.small {
  width: 60px;
  height: 60px;
  font-size: 30px;
}

/* 卡片通用 */
.section-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.section-title.with-bar {
  position: relative;
  padding-left: 10px;
}

.section-title.with-bar::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 16px;
  background: #e53935;
  border-radius: 2px;
}

.globe-icon {
  font-size: 20px;
}

.more-btn {
  font-size: 12px;
  color: #fff;
  background: #e53935;
  padding: 4px 10px;
  border-radius: 12px;
}

.add-btn {
  font-size: 12px;
  color: #fff;
  background: #e53935;
  padding: 4px 10px;
  border-radius: 12px;
}

/* 市场概览 */
.market-section {
  position: relative;
  overflow: hidden;
}

.market-map {
  position: relative;
  min-height: 140px;
}

.map-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  border-radius: 12px;
  opacity: 0.5;
}

.market-tags {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
}

.market-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #eee;
}

.market-tag.up {
  color: #00c853;
}

.market-tag.down {
  color: #ff5252;
}

/* DeepMate */
.deepmate-section {
  background: linear-gradient(180deg, #fff 0%, #fff8f8 100%);
}

.deepmate-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.deepmate-icon {
  width: 24px;
  height: 24px;
  background: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.deepmate-title {
  font-size: 15px;
  font-weight: 700;
  color: #333;
}

.deepmate-body {
  display: flex;
  gap: 10px;
}

.feature-card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  border: 1px solid #f0f0f0;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
}

.feature-name {
  font-size: 14px;
  font-weight: 700;
  color: #333;
}

.feature-icon {
  font-size: 14px;
}

.arrow {
  margin-left: auto;
  color: #ccc;
  font-size: 18px;
}

.feature-desc {
  font-size: 11px;
  color: #999;
  line-height: 1.4;
  margin-bottom: 8px;
}

.stock-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stock-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.stock-name {
  color: #333;
}

.stock-change {
  font-weight: 600;
}

.stock-change.up {
  color: #00c853;
}

.stock-change.down {
  color: #ff5252;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 8px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ddd;
}

.dot.active {
  background: #e53935;
}

/* AI诊股卡片 */
.ai-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.ai-robot-placeholder {
  margin: 8px 0;
}

.ai-desc {
  font-size: 12px;
  color: #e53935;
  font-weight: 500;
}

.ai-sub {
  font-size: 11px;
  color: #e53935;
  opacity: 0.8;
}

/* 深度探索 */
.explore-list {
  display: flex;
  justify-content: space-between;
}

.explore-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.explore-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
}

.explore-name {
  font-size: 11px;
  color: #666;
}

/* 我的自选 */
.watch-grid {
  display: flex;
  gap: 8px;
}

.watch-card {
  flex: 1;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
}

.watch-header {
  margin-bottom: 6px;
}

.watch-name {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.watch-code {
  font-size: 11px;
  color: #999;
}

.watch-price {
  margin-bottom: 6px;
}

.watch-price .price {
  font-size: 14px;
  font-weight: 700;
  display: block;
}

.watch-price .change {
  font-size: 11px;
}

.watch-price.up {
  color: #00c853;
}

.watch-price.down {
  color: #ff5252;
}

.chart-placeholder {
  height: 30px;
}

.sparkline {
  width: 100%;
  height: 100%;
}

/* 机构动向简报 */
.brief-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.brief-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.brief-tag {
  display: inline-block;
  width: fit-content;
  font-size: 12px;
  color: #e53935;
  background: #ffe0e0;
  padding: 2px 10px;
  border-radius: 4px;
}

.brief-content {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

.more-link {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 12px;
  cursor: pointer;
}

/* 免责声明 */
.disclaimer {
  text-align: center;
  font-size: 11px;
  color: #ccc;
  margin: 16px 0;
}

/* AI搜索框 */
.ai-search-bar {
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #ff6b6b 0%, #ff8e8e 100%);
  border-radius: 25px;
  padding: 10px 16px;
  margin-bottom: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.search-robot {
  font-size: 24px;
  margin-right: 10px;
}

.search-text {
  flex: 1;
  color: #fff;
  font-size: 14px;
}

.search-send {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  padding: 6px 0 20px;
  border-top: 1px solid #f0f0f0;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 4px 8px;
}

.nav-item.active .nav-icon,
.nav-item.active .nav-label {
  color: #e53935;
}

.nav-icon {
  font-size: 22px;
  color: #999;
}

.nav-ai-icon {
  width: 44px;
  height: 44px;
  background: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -20px;
  border: 3px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.nav-ai-icon span {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.nav-label {
  font-size: 10px;
  color: #999;
}

.nav-item.active .nav-label {
  font-weight: 500;
}
</style>
