# 前端接口调用指南

> 后端地址：`http://localhost:8989`（本地）或 cpolar 公网地址
> 所有接口返回格式统一为 GoFrame 标准响应： `{ code: 0, message: "OK", data: ... }`

---

## 一、公共配置

### 1.1 axios 基础配置

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://你的后端地址',  // 本地: http://localhost:8989
  timeout: 10000,
});

// 请求拦截器：自动带上 JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器：统一处理错误
api.interceptors.response.use(
  response => {
    const res = response.data;
    // GoFrame 错误响应 code 不为 0
    if (res.code !== 0 && res.code !== 200) {
      // 401 未授权，跳登录
      if (res.code === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(new Error('登录已过期'));
      }
      // 其他错误，弹提示
      alert(res.message);
      return Promise.reject(new Error(res.message));
    }
    return res.data;  // 直接返回 data，省去每层都 .data.data
  },
  error => {
    alert('网络错误：' + error.message);
    return Promise.reject(error);
  }
);

export default api;
```

---

## 二、已对接接口（6个）

### 2.1 登录 `/auth/login`

```javascript
// POST /auth/login
const res = await api.post('/auth/login', {
  jingwang_id: '90123456',     // 8位精网号
  password: '123456',
  agreed_policy: true           // 必须传 true
});

// res 结构：
// {
//   token: "eyJhbGciOiJIUzI1NiIs...",
//   user: {
//     id: 1,
//     jingwang_id: "90123456",
//     nickname: "会员张三",
//     user_type: 1    // 1会员 2非网 3游客
//   }
// }

localStorage.setItem('token', res.token);
```

### 2.2 首页深度探索模板 `/home/templates`

```javascript
// GET /home/templates（无需登录）
const items = await api.get('/home/templates');

// items 结构：
// [
//   { id: 1, name: "游资模板", icon: "/static/deep/youzhuang.png" },
//   { id: 2, name: "游庄模板", icon: "/static/deep/Game.png" },
//   ...
// ]

// icon 用法：直接拼接后端地址
// <img :src="backendUrl + item.icon" />
```

### 2.3 活动配置 `/activity/config`

```javascript
// GET /activity/config（无需登录）
const config = await api.get('/activity/config');

// config 结构：
// {
//   activity_name: "AI时代下的精英成长计划「TOKEN传奇榜」",
//   slogan: "麻雀战，你训练，我花钱！",
//   end_time: "2026-06-14 23:59:59",
//   countdown_seconds: 1234567,   // 剩余秒数，前端做倒计时
//   initial_token: 1000,
//   level_rules: [
//     { level: 1, min_consumed: 200, title: "AI工作流探索者" },
//     { level: 2, min_consumed: 500, title: "AI工作流领航者" },
//     { level: 3, min_consumed: 800, title: "AI工作流达人" }
//   ]
// }
```

### 2.4 页面访问埋点 `/activity/visit`

```javascript
// POST /activity/visit（需要登录）
// 静默上报，不需要处理返回值
await api.post('/activity/visit', { page: 'leaderboard' });
// page 可选值："home" | "leaderboard" | "login"
```

### 2.5 排行榜列表 `/leaderboard`

```javascript
// GET /leaderboard（需要登录，仅会员有数据）
const data = await api.get('/leaderboard', {
  params: { page: 1, size: 20 }
});

// data 结构：
// {
//   total: 200,
//   list: [
//     {
//       rank: 1,
//       user_id: 1,
//       jingwang_id: "90123456",
//       nickname: "会员张三",
//       consumed: 950,
//       level: 3,
//       level_name: "AI工作流达人",
//       is_me: false,
//       unlocked_benefits: [
//         { type: "pendant_1", name: "AI工作流探索者" },
//         { type: "ebook", name: "《机构猎手AI选股》电子书" },
//         { type: "pendant_2", name: "AI工作流领航者" },
//         { type: "return_card_200", name: "200Token定额返场卡" },
//         { type: "pendant_3", name: "AI工作流达人" },
//         { type: "return_card_400", name: "400Token定额返场卡" }
//       ],
//       next_level_need: 0    // 到达下一级还需多少 Token
//     }
//   ],
//   my_rank: {    // 当前登录用户的排名信息
//     rank: 15,
//     user_id: 1,
//     jingwang_id: "90123456",
//     nickname: "会员张三",
//     consumed: 520,
//     total_token: 1000,
//     level: 2,
//     level_name: "AI工作流领航者",
//     unlocked_benefits: [...],
//     guide_text: "再使用 280 Token 成为达人，解锁400Token返场卡"
//   }
// }
```

### 2.6 我的排名 `/leaderboard/me`

```javascript
// GET /leaderboard/me（需要登录）
const data = await api.get('/leaderboard/me');

// data 结构：
// {
//   my_rank: { ... },      // 同 /leaderboard 里的 my_rank
//   is_tourist: false      // true 表示游客/非网，不显示排名
// }
```

---

## 三、未对接接口（6个，建议补齐）

### 3.1 退出登录 `/auth/logout`

```javascript
// POST /auth/logout（需要登录）
await api.post('/auth/logout');
localStorage.removeItem('token');
window.location.href = '/login';
```

### 3.2 用户信息 `/user/profile`

```javascript
// GET /user/profile（需要登录）
const user = await api.get('/user/profile');

// user 结构：
// {
//   id: 1,
//   jingwang_id: "90123456",
//   nickname: "会员张三",
//   user_type: 1,
//   current_level: 2,
//   level_name: "AI工作流领航者",    // 注意：这里返回的是简写形式
//   total_consumed: 520,
//   token_package: {
//     total: 1000,
//     remaining: 480,
//     valid_end: "2026-06-14 23:59:59"
//   },
//   unlocked_benefits: [    // 注意：这里返回的是简写形式
//     { type: "pendant_1", name: "AI工作流探索者" },
//     { type: "ebook", name: "《机构猎手AI选股》电子书" },
//     { type: "pendant_2", name: "领航者" },
//     { type: "return_card_200", name: "200Token定额返场卡" }
//   ],
//   next_level_need: 280,
//   next_level_name: "达人"
// }
```

> **重要区分：**
> - 榜单（`/leaderboard`）里的权益名称全部带 **"AI工作流"** 前缀
> - 个人中心（`/user/profile`）里的权益名称是简写（领航者、达人）
> - 前端不要自己拼接，直接用后端返回的 `name` 字段

### 3.3 Token 训练包 `/token/package`

```javascript
// GET /token/package（需要登录）
const pkg = await api.get('/token/package');

// pkg 结构：
// {
//   total: 1000,
//   remaining: 480,
//   valid_start: "2026-06-01 00:00:00",
//   valid_end: "2026-06-14 23:59:59",
//   status: 1    // 1有效 2已用完 3已过期 4已清零
// }
```

### 3.4 消耗 Token `/token/consume`

```javascript
// POST /token/consume（需要登录）
try {
  const res = await api.post('/token/consume', {
    amount: 20,           // 每次消耗数量
    scene: 'AI诊股'       // 消耗场景
  });

  // res 结构（成功）：
  // {
  //   remaining_amount: 460,
  //   total_consumed: 540,
  //   current_level: 2,
  //   level_name: "AI工作流领航者",
  //   new_benefits: [       // 如果升级了才有值
  //     { type: "pendant_3", name: "达人" },
  //     { type: "return_card_400", name: "400Token定额返场卡" }
  //   ]
  // }

  // 如果有 new_benefits，弹出 "恭喜升级！获得新权益" 弹窗
  if (res.new_benefits && res.new_benefits.length > 0) {
    const names = res.new_benefits.map(b => b.name).join('、');
    alert(`恭喜升级！获得：${names}`);
  }
} catch (err) {
  // 余额不足时后端返回："Token余额不足，当前剩余 X Token，每次消耗需要 Y Token"
  // 已在 axios 拦截器里 alert 了
}
```

### 3.5 首页市场数据 `/home/market`

```javascript
// GET /home/market（无需登录）
const market = await api.get('/home/market');

// market 结构：
// {
//   items: [
//     { name: "上证指数", price: 3052.37, change: 12.45, percent: 0.41 },
//     ...
//   ]
// }
```

### 3.6 首页滚动文案 `/home/announcements`

```javascript
// GET /home/announcements（无需登录）
const data = await api.get('/home/announcements');

// data 结构：
// {
//   items: [
//     "Hi！你好！欢迎来到DeepChart！",
//     "新用户注册立享100Token+深度能量1个月",
//     "并可免费使用深度机构六大模板七天！"
//   ]
// }
```

---

## 四、接口权限说明

| 接口 | 方法 | 需要登录 |
|------|------|----------|
| `/auth/login` | POST | ❌ |
| `/auth/logout` | POST | ✅ |
| `/user/profile` | GET | ✅ |
| `/token/package` | GET | ✅ |
| `/token/consume` | POST | ✅ |
| `/leaderboard` | GET | ✅ |
| `/leaderboard/me` | GET | ✅ |
| `/activity/config` | GET | ❌ |
| `/activity/visit` | POST | ✅ |
| `/home/market` | GET | ❌ |
| `/home/announcements` | GET | ❌ |
| `/home/templates` | GET | ❌ |

---

## 五、错误码说明

| code | 含义 | 处理方式 |
|------|------|----------|
| 0 / 200 | 成功 | 正常处理 data |
| 401 | 未授权/Token 过期 | 清除 token，跳转登录页 |
| 50 | 业务错误（如余额不足） | alert(message) |

---

*文档生成时间：2026-06-04*