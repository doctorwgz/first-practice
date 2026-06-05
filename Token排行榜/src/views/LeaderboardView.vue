<template>
  <div class="leaderboard-page">
    <!-- Background -->
    <div class="bg-wrapper">
      <img src="/bg.png" class="bg-img" alt="bg" />
    </div>

    <div class="content" ref="scrollContainer">
      <!-- Back button -->
      <div class="back-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </div>

      <!-- Title Section -->
      <div class="title-section">
        <div class="subtitle">AI 时代下的精英成长计划</div>
        <h1 class="main-title">TOKEN传奇榜</h1>
        <div class="slogan">"麻雀战，你训练，我花钱!"</div>
      </div>

      <!-- Trophy -->
      <div class="trophy-section">
        <img src="/bg.png" class="trophy-bg" alt="" />
      </div>

      <!-- Countdown -->
      <div class="countdown-bar" v-if="activityConfig">
        <span class="countdown-label">活动剩余:</span>
        <span class="countdown-time">{{ countdownText }}</span>
      </div>

      <!-- My Training -->
      <div class="my-train-section" v-if="myRank">
        <img src="/bg-my-train.png" class="section-bg" alt="" />
        <div class="train-content">
          <div class="train-header">
            <span class="train-title">我的训练情况</span>
            <span class="train-date">4.11 - 4.24</span>
          </div>
          <div class="user-info">
            <span class="user-name">{{ myRank.nickname }} (ID: {{ myRank.jingwang_id }})</span>
          </div>
          <div class="rank-badge">
            <span class="badge-label">传奇榜排名</span>
            <span class="badge-rank">{{ String(myRank.rank).padStart(2, '0') }}</span>
          </div>
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="progress-text">{{ myRank.consumed }}/1000Token</div>
          </div>
          <div class="level-badge">
            <span class="level-label">当前称号:</span>
            <span class="level-name">{{ myRank.level_name || '暂无称号' }}</span>
          </div>
          <div class="benefits-list" v-if="unlockedBenefits.length">
            <div class="benefit-item" v-for="(b, i) in unlockedBenefits" :key="i">
              {{ b.name }}
            </div>
          </div>
          <div class="guide-text">{{ guideText }}</div>
        </div>
      </div>

      <!-- Rank List -->
      <div class="rank-section" :class="{ 'visitor-blur': isVisitor }">
        <img src="/bg-rank-list.png" class="section-bg" alt="" />
        <div class="rank-content">
          <div class="rank-header">
            <span class="rank-title">看看大家的训练情况</span>
            <span class="participant-count">{{ totalParticipants }}人征战</span>
          </div>
          <div class="rank-list">
            <div
              v-for="(item, idx) in displayList"
              :key="item.user_id"
              class="rank-item"
              :class="{ 'is-me': item.is_me, 'top3': idx < 3 }"
            >
              <div class="rank-num">
                <img v-if="idx === 0" src="/gold.png" class="rank-icon" alt="1" />
                <img v-else-if="idx === 1" src="/silver.png" class="rank-icon" alt="2" />
                <img v-else-if="idx === 2" src="/bronze.png" class="rank-icon" alt="3" />
                <span v-else>{{ String(idx + 1).padStart(2, '0') }}</span>
              </div>
              <div class="rank-info">
                <div class="rank-name">{{ item.nickname }}</div>
                <div class="rank-id">ID {{ item.jingwang_id }}</div>
              </div>
              <div class="rank-data">
                <span class="rank-consumed">{{ item.consumed }} Token</span>
                <span class="rank-level">{{ item.level_name || '暂无称号' }}</span>
              </div>
            </div>
          </div>
          <div v-if="rankList.length > 8 && !showAll" class="expand-btn" @click="showAll = true">
            展开全部 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
        <!-- Visitor blur overlay -->
        <div v-if="isVisitor" class="visitor-overlay">
          <div class="visitor-lock">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <p>登录后查看完整排行榜</p>
          </div>
        </div>
      </div>

      <!-- Activity Description -->
      <div class="desc-section">
        <img src="/bg-desc.png" class="section-bg" alt="" />
        <div class="desc-content">
          <div class="desc-title">活动说明</div>
          <div class="desc-text">
            "AI时代下的精英成长计划"活动期间，每人赠送1000 Token训练包（4.11-4.24有效），消耗越多等级越高：≥200 Token得"探索者"挂件+《机构猎手AI选股》电子书，≥500 Token得"领航者"挂件+200Token返场卡，≥800 Token得"达人"挂件+400Token返场卡；每使用1次Token进行训练，都讲实时计入TOKEN传奇榜，排名全平台可见。现在就开练，拿权益边冲榜！
          </div>
        </div>
      </div>

      <div class="bottom-padding"></div>
    </div>

    <!-- Visitor Login Bar (user_type 3) -->
    <div v-if="isVisitor" class="visitor-bar">
      <div class="visitor-content">
        <span>登录以获得更好的体验</span>
        <button class="visitor-login-btn" @click="goLogin">登录</button>
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

const activityConfig = ref(null)
const rankList = ref([])
const myRank = ref(null)
const totalParticipants = ref(0)
const showAll = ref(false)
const countdown = ref(0)
let countdownTimer = null

const isLoggedIn = computed(() => userStore.isLoggedIn)
const isVisitor = computed(() => userStore.user?.user_type === 3)

const displayList = computed(() => {
  if (showAll.value) return rankList.value
  return rankList.value.slice(0, 8)
})

const progressPercent = computed(() => {
  if (!myRank.value) return 0
  return Math.min((myRank.value.consumed / 1000) * 100, 100)
})

const unlockedBenefits = computed(() => {
  if (!myRank.value) return []
  if (myRank.value.unlocked_benefits?.length) {
    return myRank.value.unlocked_benefits
  }
  const benefits = []
  if (myRank.value.consumed >= 200) {
    benefits.push({ name: '挂件1' })
    benefits.push({ name: '《机构猎手AI选股》电子书' })
  }
  if (myRank.value.consumed >= 500) {
    benefits.push({ name: '挂件2' })
    benefits.push({ name: '200Token定额返场卡' })
  }
  if (myRank.value.consumed >= 800) {
    benefits.push({ name: '挂件3' })
    benefits.push({ name: '400Token定额返场卡' })
  }
  return benefits
})

const guideText = computed(() => {
  if (!myRank.value) return ''
  const need = myRank.value.next_level_need
  if (need > 0) {
    return `再使用 ${need} Token 即可成为${myRank.value.next_level_name}`
  }
  return '恭喜已达最高等级！继续训练冲击传奇榜榜首'
})

const countdownText = computed(() => {
  if (countdown.value <= 0) return '活动已结束'
  const days = Math.floor(countdown.value / 86400)
  const hours = Math.floor((countdown.value % 86400) / 3600)
  const minutes = Math.floor((countdown.value % 3600) / 60)
  const seconds = countdown.value % 60
  return `${days}天${hours}时${minutes}分${seconds}秒`
})

onMounted(async () => {
  // Load activity config
  try {
    const config = await request.get('/activity/config')
    activityConfig.value = config
    countdown.value = config.countdown_seconds || 0
    startCountdown()
  } catch (err) {
    console.log('Activity config failed:', err)
    countdown.value = 1234567
    startCountdown()
  }

  // Visitor (user_type 3): only show login bar, no rank data
  if (isVisitor.value) {
    rankList.value = []
    totalParticipants.value = 603
    myRank.value = null
  } else if (isLoggedIn.value) {
    // Member (1) and Non-net (2): load full leaderboard
    try {
      const data = await request.get('/leaderboard')
      rankList.value = data.list || []
      myRank.value = data.my_rank || null
      totalParticipants.value = data.total || 0
    } catch (err) {
      console.log('Leaderboard failed:', err)
      rankList.value = generateMockRanks()
      myRank.value = rankList.value.find(r => r.is_me) || null
      totalParticipants.value = 603
    }

    // Load profile for my training data
    try {
      const profile = await request.get('/user/profile')
      if (profile && myRank.value) {
        myRank.value.consumed = profile.total_consumed ?? myRank.value.consumed
        myRank.value.level_name = profile.level_name || myRank.value.level_name
        myRank.value.next_level_need = profile.next_level_need
        myRank.value.next_level_name = profile.next_level_name
        myRank.value.unlocked_benefits = profile.unlocked_benefits
      }
    } catch (err) {
      console.log('Profile failed:', err)
    }
  }

  // Record visit
  request.post('/activity/visit', { page: 'leaderboard' }).catch(() => {})
})

onUnmounted(() => {
  clearInterval(countdownTimer)
})

function startCountdown() {
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    }
  }, 1000)
}

function generateMockRanks() {
  const names = ['张三', '李四', '王五', '小四', '小五', '极客阿锋', '小七', '小八', '小九', '小十']
  return names.map((name, i) => ({
    rank: i + 1,
    user_id: i + 1,
    jingwang_id: `1000${String(i).padStart(3, '0')}`,
    nickname: name,
    consumed: 999 - i * 30,
    level: i < 6 ? 3 : i < 8 ? 2 : 1,
    level_name: i < 6 ? 'AI工作流达人' : i < 8 ? 'AI工作流领航者' : 'AI工作流探索者',
    is_me: i === 5
  }))
}

function goBack() {
  router.push('/home')
}

function goLogin() {
  router.push('/login')
}
</script>

<style scoped>
.leaderboard-page {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #1e88e5;
}

.bg-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
}

.bg-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0 16px;
  -webkit-overflow-scrolling: touch;
}

.back-btn {
  position: absolute;
  top: 12px;
  left: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
}

/* Title Section */
.title-section {
  text-align: center;
  padding-top: 40px;
  margin-bottom: 8px;
}

.subtitle {
  color: #fff;
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 4px;
}

.main-title {
  color: #fff;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 4px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
  margin-bottom: 8px;
}

.slogan {
  color: #fff;
  font-size: 14px;
  font-style: italic;
  opacity: 0.9;
}

/* Trophy */
.trophy-section {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.trophy-bg {
  width: 200px;
  height: auto;
  opacity: 0;
}

/* Countdown */
.countdown-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.countdown-label {
  color: #fff;
  font-size: 12px;
  opacity: 0.8;
}

.countdown-time {
  color: #ffeb3b;
  font-size: 13px;
  font-weight: 600;
}

/* Section backgrounds */
.my-train-section,
.rank-section,
.desc-section {
  position: relative;
  margin-bottom: 16px;
  border-radius: 16px;
  overflow: hidden;
}

.section-bg {
  width: 100%;
  height: auto;
  display: block;
}

/* My Training Content */
.train-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
}

.train-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.train-title {
  color: #1e88e5;
  font-size: 15px;
  font-weight: 700;
}

.train-date {
  color: #888;
  font-size: 11px;
}

.user-info {
  margin-bottom: 8px;
}

.user-name {
  color: #333;
  font-size: 13px;
  font-weight: 500;
}

.rank-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.badge-label {
  color: #1e88e5;
  font-size: 12px;
  background: #e3f2fd;
  padding: 2px 10px;
  border-radius: 10px;
}

.badge-rank {
  color: #e53935;
  font-size: 24px;
  font-weight: 800;
}

.progress-section {
  margin-bottom: 8px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: #e53935;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 11px;
  color: #888;
  text-align: right;
}

.level-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.level-label {
  color: #666;
  font-size: 12px;
}

.level-name {
  color: #1e88e5;
  font-size: 13px;
  font-weight: 600;
}

.benefits-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.benefit-item {
  font-size: 11px;
  color: #e53935;
  background: #ffebee;
  padding: 2px 8px;
  border-radius: 8px;
}

.guide-text {
  font-size: 12px;
  color: #e53935;
  line-height: 1.4;
  margin-top: auto;
}

/* Rank Section */
.rank-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 20px;
}

.rank-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.rank-title {
  color: #e53935;
  font-size: 15px;
  font-weight: 700;
}

.participant-count {
  color: #888;
  font-size: 11px;
}

.rank-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #fff;
  border-radius: 10px;
  transition: all 0.2s;
}

.rank-item.is-me {
  border: 2px solid #e53935;
  background: #fff8f8;
}

.rank-item.top3 {
  background: #fff8e1;
}

.rank-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #888;
}

.rank-icon {
  width: 28px;
  height: 28px;
}

.rank-info {
  flex: 1;
}

.rank-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.rank-id {
  font-size: 10px;
  color: #aaa;
}

.rank-data {
  text-align: right;
}

.rank-consumed {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #e53935;
}

.rank-level {
  font-size: 11px;
  color: #888;
}

.expand-btn {
  text-align: center;
  padding: 12px;
  color: #e53935;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

/* Description Section */
.desc-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 20px;
}

.desc-title {
  color: #5e35b1;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
}

.desc-text {
  font-size: 12px;
  color: #666;
  line-height: 1.8;
}

.bottom-padding {
  height: 100px;
}

/* Visitor Bar */
.visitor-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2a2a2a;
  padding: 16px 20px;
  z-index: 100;
  border-radius: 16px 16px 0 0;
}

.visitor-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.visitor-content span {
  color: #fff;
  font-size: 14px;
}

.visitor-login-btn {
  width: 100%;
  height: 44px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 22px;
  font-size: 15px;
  cursor: pointer;
}

/* Visitor blur effect on rank list */
.visitor-blur {
  position: relative;
}

.visitor-blur .rank-content {
  filter: blur(4px);
  pointer-events: none;
}

.visitor-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.visitor-lock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 13px;
}
</style>
