<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import StatusBar from '../components/StatusBar.vue'
import { asset } from '../utils/asset.js'
import request from '../utils/request.js'

const router = useRouter()

function bgStyle(path) {
  return { backgroundImage: `url(${asset(path)})` }
}

/* ---------- 数据 ---------- */
const activity = ref({})
const rankList = ref([])
const joinedCount = ref(0)
const myRank = ref(null)
const isGuest = ref(false)
const loading = ref(true)

const myUsed = computed(() => myRank.value?.consumed ?? 0)
const myTotalToken = computed(() => myRank.value?.total_token ?? 1000)
const myProgress = computed(() => Math.min(100, (myUsed.value / myTotalToken.value) * 100))
const myTip = computed(() => myRank.value?.guide_text ?? '')
const myTipHtml = computed(() =>
  myTip.value.replace(/(\d+)/g, '<span style="color:#f6b73c;font-weight:800">$1</span>')
)

// 等级配置(从后端活动配置转换,保持和原模板字段兼容)
const tiers = computed(() => {
  const rules = activity.value?.level_rules || []
  const list = rules.map((r) => ({
    level: r.level,
    min: r.min_consumed,
    title: r.title,
    benefit: ['挂件1 + 电子书', '挂件2 + 200Token定额返场卡', '挂件3 + 400Token定额返场卡'][r.level - 1] || '',
    medal: ['', '/assets/activity/bronze.png', '/assets/activity/silver.png', '/assets/activity/gold.png'][r.level] || ''
  }))
  list.push({ level: 0, min: 0, title: '暂无称号', benefit: '尚未解锁权益', medal: '' })
  return list.sort((a, b) => b.level - a.level)
})

// 当前等级
const myTier = computed(() => {
  const t = tiers.value.find((t) => myUsed.value >= t.min && t.level > 0)
  return t || tiers.value.find((t) => t.level === 0) || { title: '暂无称号', medal: '' }
})

// 已解锁权益(直接取后端返回的 unlocked_benefits)
const unlocked = computed(() => myRank.value?.unlocked_benefits || [])
const unlockedLabel = computed(() => {
  if (!unlocked.value.length) return ''
  return unlocked.value.map(u => u.name).join(' + ')
})

/* ---------- 倒计时 ---------- */
const remain = ref({ d: 0, h: 0, m: 0, s: 0 })
let timer = null
let remainSec = 0

function initCountdown() {
  // 固定截止日期：2026-06-07 23:59:59 (北京时间)
  const target = new Date('2026-06-07T23:59:59+08:00').getTime()
  remainSec = Math.max(0, Math.floor((target - Date.now()) / 1000))
  tick()
  timer = setInterval(() => {
    if (remainSec > 0) remainSec -= 1
    tick()
  }, 1000)
}
function tick() {
  const s = Math.max(0, remainSec)
  remain.value = {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60
  }
}
const pad = (n) => String(n).padStart(2, '0')

/* ---------- 榜单折叠 ---------- */
const expanded = ref(false)
const visibleList = computed(() =>
  expanded.value ? rankList.value : rankList.value.slice(0, 8)
)
const canFold = computed(() => rankList.value.length > 8)

function medalOf(rank) {
  return (
    { 1: '/assets/activity/gold.png', 2: '/assets/activity/silver.png', 3: '/assets/activity/bronze.png' }[rank] ||
    ''
  )
}

function goHome() {
  router.push('/home')
}
function goLogin() {
  router.push('/login')
}

// 加载排行榜数据
async function loadData() {
  loading.value = true
  try {
    const [configRes, lbRes, meRes] = await Promise.all([
      request.get('/activity/config').catch(() => null),
      request.get('/leaderboard').catch(() => null),
      request.get('/leaderboard/me').catch(() => null)
    ])

    if (configRes) activity.value = configRes

    if (lbRes) {
      console.log('后端 /leaderboard 返回:', lbRes)
      rankList.value = (lbRes.list || []).map((u) => ({
        rank: u.rank,
        id: u.jingwang_id,
        name: u.nickname,
        used: u.consumed,
        title: u.level_name || '暂无称号',
        isMe: u.is_me
      }))
      console.log('前端 rankList:', rankList.value)
      joinedCount.value = lbRes.total ?? 0
      if (lbRes.my_rank) {
        myRank.value = {
          ...lbRes.my_rank,
          name: lbRes.my_rank.nickname,
          id: lbRes.my_rank.jingwang_id,
          used: lbRes.my_rank.consumed
        }
      }
    }

    if (meRes) {
      console.log('后端 /leaderboard/me 返回:', meRes)
      isGuest.value = meRes.is_tourist ?? false
      if (meRes.my_rank) {
        myRank.value = {
          ...meRes.my_rank,
          name: meRes.my_rank.nickname,
          id: meRes.my_rank.jingwang_id,
          used: meRes.my_rank.consumed
        }
      }
    }

    initCountdown()

    // 埋点
    request.post('/activity/visit', { page: 'leaderboard' }).catch(() => {})
  } catch (e) {
    console.error('排行榜数据加载失败', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="screen lb no-scrollbar">
    <!-- 顶部状态栏 + 返回 -->
    <div class="lb-topbar">
      <StatusBar dark />
      <button class="back" @click="goHome">‹ 返回</button>
    </div>

    <div class="lb-scroll no-scrollbar" :class="{ 'guest-pad': isGuest }" :style="bgStyle('/assets/activity/bg.png')">
      <!-- Hero:bg.png 已含主标题/口号/金杯,这里叠加倒计时 -->
      <div class="hero-spacer">
        <div class="countdown">
          <span class="cd-text">活动剩余：{{ remain.d }}天{{ pad(remain.h) }}时</span>
        </div>
      </div>

      <!-- ==================== 我的训练情况 - 第二张图样式 ==================== -->
      <section class="card train" :style="bgStyle('/assets/activity/bg-my-train.png')">
        <div class="train-inner">
          <!-- 第一行：用户名 + 日期 -->
          <div class="train-row owner">
            <div class="owner-info">
              <div class="owner-name">{{ myRank?.name }}（ID: {{ myRank?.id }}）</div>
            </div>
            <div class="rk-date">6.1-6.7</div>
          </div>

          <!-- 第二行：排名 + Token 进度（同一个框） -->
          <div class="rank-token-box">
            <!-- 左侧：传奇榜排名 -->
            <div class="rank-side">
              <div class="rk-label">传奇榜排名</div>
              <div class="rk-num">{{ pad(myRank?.rank || 0) }}</div>
            </div>
            <!-- 右侧：Token 消耗进度 -->
            <div class="token-side">
              <div class="token-label">{{ myUsed }} / {{ myTotalToken }} Token</div>
              <div class="token-bar">
                <div class="token-fill" :style="{ width: myProgress + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- 第三行：当前称号 -->
          <div class="tier-row">
            <span class="tier-tag">
              <!-- <img v-if="myTier.medal" :src="asset(myTier.medal)" class="tier-medal" alt="" /> -->
              当前称号：{{ myTier.title }}
            </span>
          </div>

          <!-- 第四行：已解锁权益 -->
          <div class="unlocked">
            <span class="u-title">已解锁权益：</span>
            <template v-if="unlocked.length">
              <span class="u-chip">{{ unlockedLabel }}</span>
            </template>
            <span v-else class="u-empty">暂未解锁权益，继续训练吧</span>
          </div>

          <!-- 第五行：提示 -->
          <div class="tip-plain" v-html="myTipHtml"></div>
        </div>
      </section>

      <!-- 看看大家的训练情况 -->
      <section class="card ranklist" :style="bgStyle('/assets/activity/bg-rank-list.png')">
        <div class="rank-inner">
          <div class="joined">{{ joinedCount }} 人参战</div>

          <ul class="rank-ul">
            <li
              v-for="u in visibleList"
              :key="u.id"
              class="rank-li"
              :class="{ me: u.isMe, top3: u.rank <= 3 }"
            >
              <span class="r-rank">
                <img v-if="u.rank <= 3" :src="asset(medalOf(u.rank))" class="r-medal" alt="" />
                <span v-else>{{ u.rank }}</span>
              </span>
              <span class="r-info">
                <span class="r-name">{{ u.name }}<em v-if="u.isMe">(我)</em></span>
                <span class="r-id">ID:{{ u.id }}</span>
              </span>
              <span class="r-token"><b>{{ u.used }}</b> Token</span>
              <span class="r-title" :class="{ none: u.title === '暂无称号' }">{{ u.title }}</span>
            </li>
          </ul>

          <button v-if="canFold" class="fold-btn" @click="expanded = !expanded">
            {{ expanded ? '收起榜单 ▲' : '展开全部 ▼' }}
          </button>
          <p class="rank-note">排行榜仅录入前 100 名 · 排名全平台可见</p>
        </div>
      </section>

      <!-- 活动说明 -->
      <section class="card desc" :style="bgStyle('/assets/activity/bg-desc.png')">
        <div class="desc-inner">
          <p>
             "AI时代下的精英成长计划"活动期间，每人赠送1000 Token训练包（4.11-4.24有效），消耗越多等级越高：≥200 Token得"探索者"挂件+《机构猎手AI选股》电子书，≥500 Token得"领航者"挂件+200Token返场卡，≥800 Token得"达人"挂件+400Token返场卡；每使用1次token进行训练，都将实时计入 TOKEN传奇榜，排名全平台可见。现在就开练，边拿权益边冲榜！
          </p>
        </div>
      </section>
    </div>

    <!-- 游客登录提示(非会员/未登录时底部展示) -->
    <transition name="slide-up">
      <div v-if="isGuest" class="guest-bar">
        <span>登录以获得更好的体验</span>
        <button class="guest-login" @click="goLogin">登录</button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.lb {
  display: flex;
  flex-direction: column;
  background: #2b7fde;
}

.lb-topbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;
}
.back {
  position: absolute;
  left: 10px;
  top: 46px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 4px 8px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* 全页蓝色底图(bg.png 含标题+口号+金杯) */
.lb-scroll {
  flex: 1;
  overflow-y: auto;
  background-color: #2b7fde;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
  padding: 0 12px 24px;
}
.lb-scroll.guest-pad {
  padding-bottom: 76px;
}

/* 顶部留白给 bg 里的标题与金杯,底部放倒计时 */
.hero-spacer {
  height: 300px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 80px;
  margin-right: -12px;
}
.countdown {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 6px 12px;
  color: #fff;
}
.cd-text {
  font-size: 13px;
  font-weight: 700;
}

/* 卡片通用 */
.card {
  border-radius: 16px;
  margin-bottom: 12px;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(8, 30, 70, 0.18);
}
.train {
  position: relative;
  background-color: #e6f2fc;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
}
.train::before {
  content: '';
  position: absolute;
  top: 35px;
  left: 12px;
  right: 12px;
  bottom: 12px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  z-index: 1;
}
.ranklist {
  background-color: #fdf5ee;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
}
.desc {
  background-color: #eceafa;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% auto;
}

/* 预留顶部 baked 标题 tab 高度 */
.train-inner {
  position: relative;
  z-index: 2;
  padding: 42px 16px 16px;
}
.rank-inner {
  padding: 44px 14px 14px;
}
.desc-inner {
  padding: 44px 16px 16px;
  color: #3a3f57;
  font-size: 12.5px;
  line-height: 1.7;
}

/* ==================== 我的训练情况 - 第二张图样式 ==================== */

/* 第一行：用户信息 + 日期 */
.train-row.owner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
}

.owner-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.owner-name {
  font-size: 11px;
  font-weight: 800;
  color: #0f0f0f;
}
.owner-id {
  font-size: 12px;
  color: #6b86ad;
}

.rk-date {
  font-size: 13px;
  font-weight: 600;
  color: #afdbf1;
  transform: translateY(-30px);   /* 单独向上移动 4px */
}

/* 第二行：排名 + Token 进度（同一个框） */
.rank-token-box {
  display: flex;
  align-items: center;
  background: #e3ebf8;
  border-radius: 12px;
  padding: 12px 14px;
  gap: 16px;
  margin-bottom: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 左侧：传奇榜排名 */
.rank-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
}

.rank-side .rk-label {
  font-size: 20px;
  font-weight: 600;
  color: #0471ec;
}

.rank-side .rk-num {
  font-size: 20px;
  font-weight: 900;
  color: #f18102;
  line-height: 1;
}

/* 右侧：Token 消耗进度 */
.token-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.token-label {
  font-size: 13px;
  font-weight: 600;
  color: #1f3c66;
  text-align: right;
}

.token-bar {
  height: 8px;
  background: #e8eef5;
  border-radius: 4px;
  overflow: hidden;
}

.token-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff8c42, #ff6b35);
  border-radius: 4px;
  transition: width 0.6s ease;
  position: relative;
}
.token-fill::after {
  content: '';
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

/* 第三行：当前称号 */
.tier-row {
  margin-bottom: 10px;
  display: flex;           /* 开启 flex 布局 */
  justify-content: center;
}

.tier-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  color: #cddef5;
  background:#08a7f1 ;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
}

.tier-medal {
  width: 30px;
  height: auto;
}

/* 第四行：已解锁权益 */
.unlocked {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0px;
  margin-bottom: 0px;
}

.u-title {
  font-size: 12px;
  font-weight: 600;
  color: #68a1f1;
  white-space: nowrap;
}

.u-chip {
  font-size: 12px;
  color: #68a1f1;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.u-empty {
  font-weight: 600;
  font-size: 12px;
  color: #68a1f1;
}

/* 第五行：提示 */
.tip-plain {
  color: #68a1f1;
  /* background: rgba(47, 123, 255, 0.08);
  border-radius: 8px; */
  /* padding: 10px 12px; */
  line-height: 1.5;
  font-weight: 600;
  font-size: 12px;
}

/* ==================== 榜单 ==================== */
.joined {
  font-size: 12px;
  color: #68a1f1;
  text-align: right;
  margin-bottom: 8px;
}
.rank-ul {
  background: #fff;
  border-radius: 12px;
  padding: 4px 10px;
}
.rank-li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 4px;
  border-bottom: 1px solid #f4ece2;
}
.rank-li:last-child {
  border-bottom: none;
}
.rank-li.me {
  background: linear-gradient(90deg, #fff7e9, #fffdf8);
  margin: 0 -10px;
  padding: 10px 14px;
  border-bottom: none;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1.5px #f6cd7e;
}
.r-rank {
  width: 30px;
  text-align: center;
  font-size: 15px;
  font-weight: 800;
  color: #97a1b2;
  flex-shrink: 0;
}
.r-medal {
  width: 28px;
  height: auto;
}
.r-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.r-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-main);
}
.r-name em {
  font-style: normal;
  color: var(--brand-red);
  font-size: 11px;
  margin-left: 3px;
}
.r-id {
  font-size: 10px;
  color: #a6adba;
}
.r-title {
  font-size: 11px;
  color: #0471ec;
  flex-shrink: 0;
}
.r-title.none {
  color: #9aa6b8;
}
.r-token {
  width: 76px;
  text-align: left;
  font-size: 12px;
  color: #6b7280;
  flex-shrink: 0;
}
.r-token b {
  color: #d4a017;
  font-size: 13px;
}
.fold-btn {
  width: 100%;
  margin-top: 10px;
  height: 38px;
  border-radius: 19px;
  background: #fff;
  color: #b07a3c;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(176, 122, 60, 0.15);
}
.rank-note {
  text-align: center;
  font-size: 11px;
  color: #c3a987;
  margin: 10px 0 0;
}

/* ==================== 活动说明 ==================== */
.desc b {
  color: var(--brand-red);
}

/* ==================== 游客底部登录条 ==================== */
.guest-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(23, 23, 24, 0.92);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 14px 18px;
  color: #fff;
  font-size: 14px;
  z-index: 40;
}
.guest-login {
  background: linear-gradient(90deg, #ff4b5c, #f5394a);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  padding: 9px 80px;
  border-radius: 22px;
  box-shadow: 0 50px 16px rgba(245, 57, 74, 0.4);
}
.slide-up-enter-active {
  transition: transform 0.35s ease;
}
.slide-up-enter-from {
  transform: translateY(100%);
}
</style>