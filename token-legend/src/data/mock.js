// ============================================================
// 全部为练手用假数据(PDF 要求:数据均填充假数据即可)
// ============================================================

// ---------- 活动配置 ----------
export const ACTIVITY = {
  totalToken: 1000,
  // 活动周期 4月11日 00:00 ~ 4月24日 23:59
  startAt: '2026-04-11T00:00:00',
  endAt: '2026-04-24T23:59:59',
  mainTitle: 'AI 时代下的精英成长计划',
  brandTitle: 'TOKEN传奇榜',
  slogan: '麻雀战,你训练,我花钱!'
}

// ---------- 等级 / 权益 配置(PDF 第七页表格) ----------
export const TIERS = [
  { level: 3, min: 800, title: 'AI工作流达人', benefit: '挂件3 + 400 Token 定额返场卡', medal: '/assets/activity/gold.png' },
  { level: 2, min: 500, title: 'AI工作流领航者', benefit: '挂件2 + 200 Token 定额返场卡', medal: '/assets/activity/silver.png' },
  { level: 1, min: 200, title: 'AI工作流探索者', benefit: '挂件1 + 电子书', medal: '/assets/activity/bronze.png' },
  { level: 0, min: 0, title: '暂无称号', benefit: '尚未解锁权益', medal: '' }
]

// 根据消耗 Token 计算当前等级
export function tierByToken(used) {
  return TIERS.find((t) => used >= t.min) || TIERS[TIERS.length - 1]
}

// 根据消耗量返回“剩余使用量引导语”(PDF 第八页四档文案)
export function nextTierTip(used) {
  if (used < 200) return `再消耗 ${200 - used} Token 即可成为 AI工作流探索者,获得电子书`
  if (used < 500) return `再消耗 ${500 - used} Token 升级为领航者,解锁 200 Token 返场卡`
  if (used < 800) return `再消耗 ${800 - used} Token 成为达人,解锁 400 Token 返场卡`
  return '恭喜已达最高等级!继续训练冲击传奇榜榜首'
}

// ---------- 当前登录用户 ----------
export const CURRENT_USER = {
  id: '0001024',
  name: '哈喽到林梅',
  isMember: true, // 会员才会自动弹出活动弹窗
  usedToken: 960
}

// ---------- 首页机器人对话框循环文案(每 2s 上滚;固定标题"HI!你好!"下方滚动) ----------
export const ROBOT_LINES = [
  '欢迎来到 DeepChart!',
  '新用户注册立享 100 Token + 深度能量 1 个月',
  '并可免费使用深度机构六大模板七天!'
]

// ---------- 今日市场概览:11 个指数(1:1 原型,涨绿跌红) ----------
export const MARKET_INDEXES = [
  // 左列(美洲)
  { name: '加拿大S&P', chg: 0.07, col: 'l' },
  { name: '道琼斯', chg: -0.07, col: 'l' },
  { name: '纳斯达克', chg: 0.07, col: 'l' },
  { name: '标普500', chg: 0.07, col: 'l' },
  // 右列(亚太)
  { name: '上证指数', chg: -0.07, col: 'r' },
  { name: '恒生指数', chg: -0.07, col: 'r' },
  { name: 'VNIDEX', chg: -0.07, col: 'r' },
  { name: 'SET', chg: 0.07, col: 'r' },
  { name: '印尼雅加达综合', chg: 0.07, col: 'r' },
  { name: '富时马来西亚KLCI', chg: -0.07, col: 'r' },
  { name: '富时新加坡海峡时报', chg: 0.07, col: 'r' }
]

// ---------- 机构猎手轮播卡(每 3s 右滚;每张 = 副标题 + 股票 pill 列表) ----------
export const HUNTER_CARDS = [
  {
    subtitle: 'AI追踪市场机构动向,以下股票值得关注',
    stocks: [
      { name: '曼恩斯特', chg: 2.99 },
      { name: '恒兴新材', chg: -0.45 },
      { name: '红四方', chg: -0.67 }
    ]
  },
  {
    subtitle: '牛气冲天,可关注以下股票',
    stocks: [{ name: 'CapLand…', chg: -0.552 }]
  },
  {
    subtitle: '仙人指路,可关注以下股票',
    stocks: [{ name: 'Singtel', chg: -1.613 }]
  }
]

// ---------- 深度探索:7 个模板(可横向滑动) ----------
export const EXPLORE_TEMPLATES = [
  { name: '游资模板', icon: '/assets/home/Game.png' },
  { name: '游庄模板', icon: '/assets/home/youzhuang.png' },
  { name: '主力模板', icon: '/assets/home/zhuli.png' },
  { name: '机构模板', icon: '/assets/home/jigou.png' },
  { name: '极限模板', icon: '/assets/home/jixian.png' },
  { name: '量化模板', icon: '/assets/home/zhuli.png' },
  { name: '短线模板', icon: '/assets/home/jixian.png' }
]

// ---------- 我的自选(1:1 原型) ----------
export const WATCHLIST = [
  { name: '特斯拉', code: 'TSLA', price: '432.230', chg: 2.92 },
  { name: '英伟达', code: 'NVDA', price: '189.900', chg: -2.92 },
  { name: '苹果', code: 'AAPL', price: '256.830', chg: 2.92 }
]

// ---------- 机构动向简报(红色标签即股票名,1:1 原型) ----------
export const BRIEFS = [
  { tag: '特斯拉', text: '当前市场多头资金占优,资金持续流入。当前市场多头资金占优,资金持续流入。' },
  { tag: '英伟达', text: '当前市场多头资金占优,资金持续流入。当前市场多头资金占优,资金持续流入。' },
  { tag: '苹果', text: '当前市场多头资金占优,资金持续流入。当前市场多头资金占优,资金持续流入。' }
]

// ---------- 底部导航 ----------
export const BOTTOM_NAV = [
  { key: 'home', label: '首页', icon: 'home' },
  { key: 'market', label: '行情', icon: 'market' },
  { key: 'deepmate', label: 'DeepMate', icon: 'ai' },
  { key: 'explore', label: '深度探索', icon: 'explore' },
  { key: 'mine', label: '我的', icon: 'mine' }
]

// ---------- 排行榜数据(按消耗 Token 降序;>8 条用于演示折叠) ----------
const RAW_RANK = [
  { id: 'DC0731001', name: '张三', used: 998 },
  { id: 'DC0731002', name: '李四', used: 986 },
  { id: 'DC0731003', name: '王五', used: 970 },
  { id: 'DC0731004', name: '小四', used: 964 },
  { id: 'DC0731005', name: '小五', used: 953 },
  { id: 'DC0001024', name: '哈喽到林梅', used: 960, isMe: true },
  { id: 'DC0731007', name: '小七', used: 731 },
  { id: 'DC0731008', name: '小八', used: 689 },
  { id: 'DC0731009', name: '小九', used: 642 },
  { id: 'DC0731010', name: '小十', used: 588 },
  { id: 'DC0731011', name: '阿强', used: 540 },
  { id: 'DC0731012', name: '阿珍', used: 503 },
  { id: 'DC0731013', name: '老陈', used: 466 },
  { id: 'DC0731014', name: '小美', used: 388 },
  { id: 'DC0731015', name: '大彬', used: 245 },
  { id: 'DC0731016', name: '游客99001', used: 180 },
  { id: 'DC0731017', name: '游客99002', used: 96 }
]

// 排序:消耗 Token 从高到低,并补全排名 + 称号
export const RANK_LIST = RAW_RANK.slice()
  .sort((a, b) => b.used - a.used)
  .map((u, i) => ({
    ...u,
    rank: i + 1,
    title: tierByToken(u.used).title
  }))

export const JOINED_COUNT = RANK_LIST.length // “xx 人参战”
