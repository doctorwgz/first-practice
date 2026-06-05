<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import StatusBar from '../components/StatusBar.vue'
import BottomNav from '../components/BottomNav.vue'
import ActivityPopup from '../components/ActivityPopup.vue'
import { asset } from '../utils/asset.js'
import request from '../utils/request.js'
import { HUNTER_CARDS, WATCHLIST, BRIEFS } from '../data/mock.js'

const router = useRouter()

function goPlaceholder() {
  router.push('/placeholder')
}

// ---------- 接口数据 ----------
const robotLines = ref([
  { title: 'HI!你好！', desc: '欢迎来到DeepChart!' },
  { title: '新用户注册', desc: '立享100Token+深度能量1个月' },
  { title: '免费体验', desc: '深度机构六大模板七天!' }
])
const marketIndexes = ref([])
const exploreTemplates = ref([])
const activityConfig = ref(null)

// 左列:加拿大S&P、道琼斯、纳斯达克、标普500（按顺序往下）
const leftIndexes = computed(() => [0, 2, 4, 6].map(i => marketIndexes.value[i]).filter(Boolean))

// 右列:上证指数、恒生指数、VNINDEX、SET、印尼雅加达综合、富时马来西亚KLCI、富时新加坡海峡时报
const rightIndexes = computed(() => [1, 3, 8, 5, 7, 9, 10].map(i => marketIndexes.value[i]).filter(Boolean))

/* ---------- 顶部机器人文案:每 2s 上滚一次 ---------- */
const lineIndex = ref(0)
let lineTimer = null

/* ---------- 机构猎手:每 3s 右滚一次(可手动滑动) ---------- */
const hunterIndex = ref(0)
let hunterTimer = null
const hunterTrackStyle = computed(() => ({
  transform: `translateX(-${hunterIndex.value * 100}%)`
}))

/* ---------- 活动弹窗 ---------- */
const showPopup = ref(false)

/* ---------- 搜索框:限制 20 字 ---------- */
const keyword = ref('')
const showMaxTip = ref(false)
let tipTimer = null

function onInput() {
  if (keyword.value.length >= 20) {
    showMaxTip.value = true
    clearTimeout(tipTimer)
    tipTimer = setTimeout(() => { showMaxTip.value = false }, 1500)
  }
}

function onSearch() {
  goPlaceholder()
}

// 加载首页数据
async function loadHomeData() {
  try {
    const [tplRes, activityRes] = await Promise.all([
      request.get('/home/templates').catch(() => null),
      request.get('/activity/config').catch(() => null)
    ])

    // 今日市场概览:前端写死
    marketIndexes.value = [
  { name: '加拿大S&P', chg: 0.07 },            // 0 左
  { name: '上证指数', chg: -0.07 },             // 1 右
  { name: '道琼斯', chg: -0.07 },               // 2 左
  { name: '恒生指数', chg: -0.07 },             // 3 右
  { name: '纳斯达克', chg: 0.07 },              // 4 左
  { name: 'SET', chg: 0.07 },                   // 5 右
  { name: '标普500', chg: 0.07 },               // 6 左
  { name: '印尼雅加达综合', chg: 0.07 },         // 7 右
  { name: 'VNINDEX', chg: -0.07 },              // 8 右（移到恒生指数下面）
  { name: '富时马来西亚KLCI', chg: 0.07, forceColor: 'down' }, // 9 右
  { name: '富时新加坡海峡时报', chg: 0.07 }     // 10 右
]
    if (tplRes?.items?.length) {
      const iconMap = ['Game', 'youzhuang', 'zhuli', 'jigou', 'jixian', 'zhuli', 'jixian']
      exploreTemplates.value = tplRes.items.map((t, idx) => ({
        name: t.name,
        icon: `/assets/home/${iconMap[idx] || 'Game'}.png`
      }))
    }
    if (activityRes) activityConfig.value = activityRes

    // 埋点
    request.post('/activity/visit', { page: 'home' }).catch(() => {})
  } catch (e) {
    console.error('首页数据加载失败', e)
  }
}

onMounted(() => {
  loadHomeData()

  lineTimer = setInterval(() => {
    if (!robotLines.value.length) return
    lineIndex.value = (lineIndex.value + 1) % robotLines.value.length
  }, 2000)

  hunterTimer = setInterval(() => {
    hunterIndex.value = (hunterIndex.value + 1) % HUNTER_CARDS.length
  }, 3000)

  // 只有从登录页进入首页时才弹窗
  const fromLogin = sessionStorage.getItem('from_login')
  if (fromLogin) {
    sessionStorage.removeItem('from_login')
    const user = JSON.parse(localStorage.getItem('dc_user') || 'null')
    if (user?.user_type === 1 || user?.user_type === 3) {
      setTimeout(() => { showPopup.value = true }, 600)
    }
  }
})

onBeforeUnmount(() => {
  clearInterval(lineTimer)
  clearInterval(hunterTimer)
})

function joinActivity() {
  showPopup.value = false
  router.push('/leaderboard')
}

// 机构猎手点击（区分滑动和点击）
const startX = ref(0)
const isDragging = ref(false)   // ← 加上这个

function onHunterStart(e) {
  startX.value = e.touches ? e.touches[0].clientX : e.clientX
  isDragging.value = false      // ← 重置
}
function onHunterEnd(e) {
  const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
  const dx = endX - startX.value
  if (Math.abs(dx) >= 30) {
    isDragging.value = true     // ← 滑动距离超过阈值，标记为滑动
    if (dx < 0) hunterIndex.value = (hunterIndex.value + 1) % HUNTER_CARDS.length
    else hunterIndex.value = (hunterIndex.value - 1 + HUNTER_CARDS.length) % HUNTER_CARDS.length
  }
}
function onHunterClick() {
  if (!isDragging.value) {      // ← 用 .value 访问
    goPlaceholder()
  }
}


// 自选股迷你面积走势
const SPARK = {
  TSLA: [5, 30, 21, 27, 23, 28, 24, 27, 23, 27, 24, 26, 23, 26, 24, 26, 23, 25, 23, 25, 22, 24, 22, 23],
  NVDA: [7, 31, 25, 30, 27, 32, 28, 31, 29, 33, 30, 32, 30, 33, 31, 34, 32, 33, 31, 34, 32, 33, 32, 34],
  AAPL: [6, 30, 22, 28, 24, 29, 25, 28, 24, 28, 25, 27, 24, 27, 25, 27, 24, 26, 24, 26, 23, 25, 23, 24]
}
function sparkLine(code) {
  const ys = SPARK[code]
  const n = ys.length
  return ys.map((y, i) => `${((i * 100) / (n - 1)).toFixed(2)},${y}`).join(' ')
}
function sparkArea(code) {
  return `${sparkLine(code)} 100,40 0,40`
}
</script>

<template>
  <div class="screen home no-scrollbar">
    <!-- 滚动内容区(包含顶部机器人) -->
    <main class="home-scroll no-scrollbar">
      <!-- 顶部问候头(珊瑚渐变,向下淡出为白) -->
      <header class="hero">
        <StatusBar />
        <div class="greet-row">
          <div class="bubble">
  <div class="roll">
    <transition name="roll-up" mode="out-in">
      <div class="roll-line" :key="lineIndex">
        <span class="roll-title">{{ robotLines[lineIndex].title }}</span>
        <span class="roll-desc">{{ robotLines[lineIndex].desc }}</span>
      </div>
    </transition>
  </div>
</div>
          <img class="robot" :src="asset('/assets/home/sayHello.png')" alt="robot" />
        </div>
      </header>
      <!-- 今日市场概览 -->
      <section
        class="card market-card"
        :style="{ backgroundImage: `url(${asset('/assets/home/white.png')})` }"
      >
        <div class="mk-head">
          <h3>今日市场概览</h3>
          <img class="globe" :src="asset('/assets/home/globe.png')" alt="" />
        </div>
        <div class="map-wrap">
          <img class="map-bg" :src="asset('/assets/home/worldMap.png')" alt="" />
          <div class="chips chips-l">
            <button
              v-for="idx in leftIndexes"
              :key="idx.name"
              class="chip"
              :class="idx.forceColor || (idx.chg >= 0 ? 'up' : 'down')"
              @click="goPlaceholder"
            >
              <span class="cn">{{ idx.name }}</span>
              <span class="cv">{{ idx.chg }}%</span>
            </button>
          </div>
          <div class="chips chips-r">
            <button
              v-for="idx in rightIndexes"
              :key="idx.name"
              class="chip"
              :class="idx.forceColor || (idx.chg >= 0 ? 'up' : 'down')"
              @click="goPlaceholder"
            >
              <span class="cn">{{ idx.name }}</span>
              <span class="cv">{{ idx.chg }}%</span>
            </button>
          </div>
        </div>
      </section>

      <!-- DeepMate: Stocks AI Assistant -->
      <section class="deepmate">
        <div class="dm-head">
          <img :src="asset('/assets/home/deepmate_logo.png')" class="dm-logo" alt="" />
          <span class="dm-title">DeepMate:</span>
          <span class="dm-sub">Stocks AI Assistant</span>
        </div>
        <div class="dm-cards">
          <!-- 机构猎手:3s 右滚 + 手动滑动 -->
          <div
            class="dm-box hunter"
            @click="onHunterClick"
            @touchstart="onHunterStart"
            @touchend="onHunterEnd"
            @mousedown="onHunterStart"
            @mouseup="onHunterEnd"
          >
            <div class="box-title">
              <span class="bt">机构猎手</span>
              <img :src="asset('/assets/home/jigoulieshou.png')" class="bt-ic" alt="" />
              <button class="go" @click.stop="goPlaceholder">›</button>
            </div>
            <div class="hunter-view">
              <div class="hunter-track" :style="hunterTrackStyle">
                <div class="hunter-slide" v-for="(h, i) in HUNTER_CARDS" :key="i">
                  <p class="h-sub">{{ h.subtitle }}</p>
                  <div
                    class="s-pill"
                    v-for="s in h.stocks"
                    :key="s.name"
                    :class="s.chg >= 0 ? 'up' : 'down'"
                  >
                    <span class="sn">{{ s.name }}</span>
                    <span class="sv">{{ s.chg >= 0 ? '+' : '' }}{{ s.chg }}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="dots">
              <i v-for="(h, i) in HUNTER_CARDS" :key="i" :class="{ on: i === hunterIndex }"></i>
            </div>
          </div>

          <!-- AI诊股 -->
          <div class="dm-box ai" @click="goPlaceholder">
            <div class="box-title">
              <span class="bt">AI诊股</span>
              <img :src="asset('/assets/home/AIzhengu.png')" class="bt-ic ai-badge" alt="" />
              <button class="go" @click.stop="goPlaceholder">›</button>
            </div>
            <img class="claw" :src="asset('/assets/home/clawAi.png')" alt="" />
            <p class="ai-desc">深度机构行为分析<br />揭秘资金背后的真相</p>
          </div>
        </div>
      </section>

      <!-- 深度探索:7 模板横滑 -->
      <section class="sec explore">
        <div class="sec-head">
          <h3>深度探索</h3>
          <button class="more-btn" @click="goPlaceholder">查看更多</button>
        </div>
        <div class="tpl-wrap">
          <div class="tpl-row no-scrollbar">
            <button
              v-for="t in exploreTemplates"
              :key="t.name"
              class="tpl"
              @click="goPlaceholder"
            >
              <img class="tpl-ic" :src="asset(t.icon)" alt="" />
              <span class="tpl-name">{{ t.name }}</span>
            </button>
          </div>
          <div class="tpl-dots"><i class="on"></i><i></i></div>
        </div>
      </section>

      <!-- 我的自选 -->
      <section class="sec watch">
        <div class="sec-head">
          <h3>我的自选</h3>
          <button class="more-btn" @click="goPlaceholder">添加自选股</button>
        </div>
        <div class="wl-row">
          <div class="wl-card" v-for="w in WATCHLIST" :key="w.code" @click="goPlaceholder">
            <div class="wl-name">{{ w.name }} ({{ w.code }})</div>
            <div class="wl-line" :class="w.chg >= 0 ? 'up' : 'down'">
              <span class="wl-price">{{ w.price }}</span>
              <span class="wl-chg">{{ w.chg >= 0 ? '+' : '' }}{{ w.chg }}%</span>
            </div>
            <svg class="spark" viewBox="0 0 100 40" preserveAspectRatio="none" :class="w.chg >= 0 ? 'up' : 'down'">
              <polygon :points="sparkArea(w.code)" fill="currentColor" fill-opacity="0.14" />
              <polyline :points="sparkLine(w.code)" fill="none" stroke="currentColor" stroke-width="1.4" />
            </svg>
          </div>
        </div>
      </section>

      <!-- 机构动向简报 -->
      <section class="sec briefs">
        <div class="sec-head">
          <h3 class="bar-title">机构动向简报</h3>
        </div>
        <ul class="brief-list">
          <li v-for="b in BRIEFS" :key="b.tag" @click="goPlaceholder">
            <span class="b-tag">{{ b.tag }}</span>
            <span class="b-text ellipsis-2">{{ b.text }}</span>
          </li>
        </ul>
        <button class="more-link" @click="goPlaceholder">查看更多&gt;&gt;</button>
        <p class="disclaimer">以上数据由 AI 生成,不构成投资建议!</p>
      </section>

      <div class="scroll-pad"></div>
    </main>

    <!-- 底部:搜索框 + 导航 -->
    <div class="home-bottom">
      <div class="search-bar">
        <img :src="asset('/assets/home/deepmate_logo.png')" class="search-ai" alt="" />
        <input
          v-model="keyword"
          maxlength="20"
          placeholder="搜索或提问试一试…"
          @input="onInput"
          @keyup.enter="onSearch"
        />
        <!-- 最大字数提示 -->
        <transition name="fade">
          <div v-if="showMaxTip" class="max-tip">已打最大字数</div>
        </transition>
        <span class="word-count">{{ keyword.length }}/20</span>
        <button class="send-btn" @click="onSearch">
          <img :src="asset('/assets/home/send.png')" alt="发送" />
        </button>
      </div>
      <BottomNav active="home" />
    </div>

    <!-- TOKEN传奇榜活动弹窗 -->
    <ActivityPopup v-if="showPopup" @join="joinActivity" @close="showPopup = false" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  background-color: #fdeff0;
  background-image: linear-gradient(
    180deg,
    #ff9c8e 0%,
    #ffb3a6 13%,
    #ffd2ca 27%,
    #fde7e3 40%,
    #fdeff0 52%
  );
}

/* ---------- 顶部问候头 ---------- */
.hero {
  color: var(--text-main);
  position: relative;
}
.greet-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 2px 16px 14px;
}
.bubble {
  position: relative;
  margin-top: 10px;
  margin-left:-15px ;
  background: #fff;
  border-radius: 16px;
  padding: 10px 18px;
  width: 200px;        /* 固定宽 */
  height: 90px;       /* 固定高（如需严格固定） */
  box-shadow: 0 8px 20px rgba(245, 72, 90, 0.14);
  flex-direction: 0;
}

.bubble::after {
  content: '';
  position: absolute;
  right: -7px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 9px solid #fff;
}
/* 删除原来的 .hi 和 .roll-line 样式 */

.roll {
  height: 58px;           /* 两行文字高度 */
  margin-top: 5px;
  overflow: hidden;
}

.roll-line {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.roll-title {
  font-size: 21px;        /* 红色大字 */
  font-weight: 800;
  color: var(--brand-red);
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.roll-desc {
  font-size: 13px;        /* 黑色小字 */
  color: #2c3038;
  font-weight: 500;
  line-height: 1.3;
}
.robot {
  position: absolute;
  z-index: 1;
  width: 120px;
  height: auto;
  margin-top: 30px;
  right: 45px;
  flex-shrink: 0;
  filter: drop-shadow(0 8px 14px rgba(210, 70, 60, 0.18));
}

/* ---------- 滚动主体 ---------- */
.home-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 4px 12px 0;
}
.card {
  background: #fff;
  border-radius: 16px;
  padding: 14px;
  margin-bottom: 14px;
  /* box-shadow: 0 0px 0px rgba(20, 30, 60, 0.05); */
}
.up {
  color: var(--up);
}
.down {
  color: var(--down);
}

/* ---------- 今日市场概览 ---------- */
.market-card {
  position: relative;
  z-index: 2;
  margin-top: 0px;
  margin-bottom: -80px;   /* ← 缩减与 DeepMate 的间距 */
  padding: 40px 14px 10px;
  background-color: transparent;
  background-position: top center;
  background-size: 100% auto;
  background-repeat: no-repeat;
}
.mk-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: -30px;          /* ← 只视觉上移，不影响文档流 */
  margin-bottom: 4px;
}
.mk-head h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
}
.globe {
  width: 30px;
  height: 30px;
}
.map-wrap {
  position: relative;
  height: 206px;
  margin-top: 2px;
}
.map-bg {
  position: absolute;
  top: -35px;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0.9;
}
.chips {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.chips-l {
  left: 5px;
  top: -30px;
  align-items: flex-start;
}
.chips-r {
  right: 10px;
  top: -25px;
  align-items: flex-end;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  padding: 1px 7px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.86);
  font-size: 9px;
  white-space: nowrap;
  box-shadow: 0 1px 4px rgba(20, 30, 60, 0.06);
  backdrop-filter: blur(1px);
}
.chip .cn {
  color: #2f3540;
  font-weight: 500;
}
.chip .cv {
  font-weight: 700;
}
.chip.up {
  border: 1px solid #b6e8cf;
}
.chip.up .cv {
  color: var(--up);
}
.chip.down {
  border: 1px solid #ffc6cc;
}
.chip.down .cv {
  color: var(--down);
}
/* 散落错位,贴合地图 */
/* 加拿大 */
.chips-l .chip:nth-child(1) {
  margin-left: 70px;
}
/* 纳斯达克 */
.chips-l .chip:nth-child(3) {
  margin-left: 30px;
}
/*  标普*/
.chips-l .chip:nth-child(4) {
  margin-left: -5px;
}
/* 恒生指数 */
.chips-r .chip:nth-child(2) {
  margin-right: 10px;
}
/* VNINDEX */
.chips-r .chip:nth-child(3) {
  margin-right: 100px;
}
/* set */
.chips-r .chip:nth-child(4) {
  margin-right: 10px;
  position: relative;
  top: -15px;  
}
/* 富时新加坡 */
.chips-r .chip:nth-child(7) {
  margin-right: 10px;
  position: relative;
  top: -2px;  
}
/* 印尼雅加达综合 */
.chips-r .chip:nth-child(5) {
  margin-right: 10px;
  position: relative;
  top: -15px;
}

/* 富时马来西亚KLCI */
.chips-r .chip:nth-child(6) {
  margin-right: 10px;
  position: relative;
  top: -15px;
}

/* 富时新加坡海峡时报 */
.chips-r .chip:nth-child(7) {
  margin-right: 1px;
  position: relative;
  top: -14px;
}


/* ---------- DeepMate ---------- */
.deepmate {
  background: #fdecec;
  border-radius: 18px;
  padding: 14px 12px 12px;
  margin-bottom: 14px;
  box-shadow: 0 6px 16px rgba(245, 72, 90, 0.06);
}
.dm-head {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
}
.dm-logo {
  width: 26px;
  height: 26px;
  border-radius: 50%;
}
.dm-title {
  font-weight: 800;
  font-size: 17px;
  color: #1a1d24;
}
.dm-sub {
  font-size: 13px;
  color: #5b626f;
  margin-left: -2px;
}
.dm-cards {
  display: flex;
  gap: 11px;
}
.dm-box {
  flex: 1;
  width: 0;
  background: #fff;
  border-radius: 14px;
  padding: 12px;
  min-height: 196px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.box-title {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;
}
.box-title .bt {
  font-size: 16px;
  font-weight: 800;
  color: #1a1d24;
}
.bt-ic {
  width: 15px;
  height: 15px;
}
.ai-badge {
  width: 22px;
  height: auto;
}
.go {
  margin-left: auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8470, #f5485a);
  color: #fff;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2px;
}

/* 机构猎手轮播 */
.hunter-view {
  flex: 1;
  overflow: hidden;
}
.hunter-track {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  transition: transform 0.4s ease;
}
.hunter-slide {
  flex: 0 0 100%;
  width: 100%;
  min-width: 100%;
}
.h-sub {
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 1.45;
  color: #8a8f99;
}
.s-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 12px;
  margin-bottom: 8px;
  background: #fdeef1;
  border-radius: 8px;
}
.s-pill .sn {
  font-size: 13px;
  color: #2f3540;
}
.s-pill .sv {
  font-size: 13px;
  font-weight: 800;
}
.s-pill.up .sv {
  color: var(--up);
}
.s-pill.down .sv {
  color: var(--down);
}
.dots {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 6px;
}
.dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #f3c9c5;
}
.dots i.on {
  background: var(--brand-red);
  width: 12px;
  border-radius: 3px;
}

/* AI诊股 */
.dm-box.ai {
  align-items: center;
  text-align: center;
}
.dm-box.ai .box-title {
  width: 100%;
}
.claw {
  width: 92px;
  height: auto;
  margin: 6px auto 8px;
}
.ai-desc {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.55;
  color: var(--brand-red);
}

/* ---------- 通用区块标题 ---------- */
.sec {
  margin-bottom: 14px;
}
.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 2px;
}
.sec-head h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
}
.more-btn {
  height: 26px;
  padding: 0 12px;
  border-radius: 13px;
  background: var(--brand-red);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

/* ---------- 深度探索 ---------- */
.tpl-wrap {
  background: #fff;
  border-radius: 16px;
  padding: 12px 6px 8px;
  box-shadow: 0 6px 16px rgba(20, 30, 60, 0.05);
}
.tpl-row {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 6px;
}
.tpl {
  flex: 0 0 auto;
  width: 62px;
  padding: 8px 4px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(20, 30, 60, 0.06);
}
.tpl-ic {
  width: 46px;
  height: 46px;
}
.tpl-name {
  font-size: 12px;
  color: #3a3f4a;
  white-space: nowrap;
}
.tpl-dots {
  display: flex;
  gap: 5px;
  justify-content: center;
  margin-top: 12px;
}
.tpl-dots i {
  width: 14px;
  height: 4px;
  border-radius: 2px;
  background: #f3d0cd;
}
.tpl-dots i.on {
  width: 22px;
  background: var(--brand-red);
}

/* ---------- 我的自选 ---------- */
.wl-row {
  display: flex;
  gap: 10px;
}
.wl-card {
  flex: 1;
  width: 0;
  background: #fff;
  border-radius: 14px;
  padding: 12px 10px 0;
  box-shadow: 0 6px 16px rgba(20, 30, 60, 0.05);
  overflow: hidden;
}
.wl-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #1a1d24;
  white-space: nowrap;
}
.wl-line {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 7px 0 8px;
}
.wl-price {
  font-size: 13px;
  font-weight: 700;
}
.wl-chg {
  font-size: 12.5px;
  font-weight: 700;
}
.spark {
  display: block;
  width: calc(100% + 20px);
  margin: 0 -10px;
  height: 46px;
}

/* ---------- 机构动向简报 ---------- */
.bar-title {
  position: relative;
  padding-left: 10px;
}
.bar-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: var(--brand-red);
}
.briefs {
  background: #fff;
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 6px 16px rgba(20, 30, 60, 0.05);
}
.briefs .sec-head {
  margin-bottom: 8px;
  padding: 0;
}
.brief-list li {
  display: flex;
  gap: 9px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
}
.brief-list li:last-child {
  border-bottom: none;
}
.b-tag {
  flex: 0 0 auto;
  height: 22px;
  padding: 0 9px;
  font-size: 12px;
  color: var(--brand-red);
  background: transparent;
  border: 1px solid var(--brand-red);
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
}
.b-text {
  font-size: 12.5px;
  color: #6a7180;
  line-height: 1.5;
}
.ellipsis-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.more-link {
  display: block;
  width: 100%;
  margin-top: 6px;
  font-size: 12px;
  color: #aab0bd;
  text-align: center;
}
.disclaimer {
  margin: 10px 0 0;
  font-size: 11px;
  color: #b3b8c2;
  text-align: center;
}
.scroll-pad {
  height: 8px;
}

/* ---------- 底部搜索 + 导航 ---------- */
.home-bottom {
  flex-shrink: 0;
  background: #fff;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 12px;
  height: 44px;
  padding: 0 8px 0 10px;
  background: #fff;
  border: 1px solid #ffd9d4;
  border-radius: 22px;
  box-shadow: 0 4px 14px rgba(245, 72, 90, 0.08);
}
.search-ai {
  width: 26px;
  height: 26px;
  border-radius: 50%;
}
.search-bar input {
  flex: 1;
  font-size: 14px;
  color: var(--text-main);
}
.search-bar input::placeholder {
  color: #c4a8a6;
}
.word-count {
  font-size: 11px;
  color: #c2c7d0;
}
.send-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff8a6b, #f5394a);
  display: flex;
  align-items: center;
  justify-content: center;
}
.send-btn img {
  width: 18px;
  height: 18px;
}

/* 最大字数提示 */
.max-tip {
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 14px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 12px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 50;
}
.max-tip::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid rgba(0, 0, 0, 0.75);
}

/* 机器人文案上滚动画 */
.roll-up-enter-active,
.roll-up-leave-active {
  transition: all 0.4s ease;
}
.roll-up-enter-from {
  transform: translateY(18px);
  opacity: 0;
}
.roll-up-leave-to {
  transform: translateY(-18px);
  opacity: 0;
}
</style>
