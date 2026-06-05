# DeepChart 前端开发文档

> 本文档面向前端开发人员，描述后端接口规范、交互逻辑及页面需求。
> 后端技术栈：GoFrame v2 + MySQL + JWT

---

## 一、环境信息

| 环境 | 地址 | 说明 |
|------|------|------|
| 后端开发环境 | `http://localhost:8989` | 本地联调 |
| 前端代理（推荐）| `/api` → `http://localhost:8000` | Vite / Webpack 代理 |
| 公网测试地址 | `https://6c403fea.r6.cpolar.top` | 内网穿透（临时） |

**注意：** cpolar 免费版域名会变化，长期稳定建议部署到公司测试服务器。

---

## 二、接口规范

### 2.1 基础约定

- **传输协议：** HTTPS（公网）/ HTTP（本地开发）
- **数据格式：** JSON
- **字符编码：** UTF-8
- **Content-Type：** `application/json`

### 2.2 响应格式

所有接口统一返回以下结构：

```json
{
  "code": 0,          // 0=成功，非0=失败
  "message": "OK",    // 提示信息
  "data": { ... }     // 业务数据（失败时为 null）
}
```

### 2.3 JWT 认证

- **登录接口** (`/auth/login`) 不需要认证，返回 `token`
- **其他接口** 需在请求头携带：

```
Authorization: Bearer <token>
```

- Token 有效期 **7 天**
- Token 过期或无效时，后端返回 **401**，前端应清除本地 token 并跳转登录页

### 2.4 公开接口（无需登录）

以下接口不带 token 也能访问：

- `POST /auth/login`
- `GET /home/market`
- `GET /home/announcements`
- `GET /home/templates`
- `GET /activity/config`

---

## 三、接口详情

### 3.1 Auth 模块 — 认证

#### 3.1.1 用户登录

```
POST /auth/login
```

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| jingwang_id | string | 是 | 精网号，8位 |
| password | string | 是 | 密码 |
| agreed_policy | boolean | 是 | 必须传 `true` |

**请求示例：**

```json
{
  "jingwang_id": "90123456",
  "password": "123456",
  "agreed_policy": true
}
```

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": 1,
      "jingwang_id": "90123456",
      "nickname": "会员张三",
      "user_type": 1
    }
  }
}
```

**错误码：**

| code | 说明 |
|------|------|
| 51 | 必须勾选用户协议和隐私政策（`agreed_policy` 校验失败）|
| 50 | 账号或密码错误 |

---

#### 3.1.2 退出登录

```
POST /auth/logout
```

**需要登录。** 前端清除本地 token 即可。

---

### 3.2 User 模块 — 用户

#### 3.2.1 获取当前用户信息

```
GET /user/profile
```

**需要登录。**

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "id": 1,
    "jingwang_id": "90123456",
    "nickname": "会员张三",
    "user_type": 1,
    "current_level": 2,
    "level_name": "AI工作流领航者",
    "total_consumed": 520,
    "token_package": {
      "total": 1000,
      "remaining": 480,
      "valid_end": "2026-04-24 23:59:59"
    },
    "unlocked_benefits": [
      { "type": "pendant_1", "name": "挂件1" },
      { "type": "ebook", "name": "《机构猎手AI选股》电子书" },
      { "type": "pendant_2", "name": "挂件2" },
      { "type": "return_card_200", "name": "200Token定额返场卡" }
    ],
    "next_level_need": 280,
    "next_level_name": "AI工作流达人"
  }
}
```

---

### 3.3 Token 模块 — Token训练包

#### 3.3.1 获取我的Token训练包

```
GET /token/package
```

**需要登录。**

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "total": 1000,
    "remaining": 480,
    "valid_start": "2026-04-11 00:00:00",
    "valid_end": "2026-04-24 23:59:59",
    "status": 1
  }
}
```

---

#### 3.3.2 消耗Token

```
POST /token/consume
```

**需要登录。**

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | int | 是 | 消耗数量，>0 |
| scene | string | 是 | 消耗场景，如：AI诊股、机构猎手 |

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "remaining_amount": 430,
    "total_consumed": 570,
    "current_level": 2,
    "level_name": "AI工作流领航者",
    "new_benefits": []
  }
}
```

---

### 3.4 Leaderboard 模块 — 排行榜

#### 3.4.1 获取排行榜列表

```
GET /leaderboard
```

**需要登录。**

**说明：**
- 后端一次性返回前100名，前端自己控制默认显示8条 vs 展开全部
- **游客（user_type = 3）访问时，`total` 为 0，`list` 为空数组**，前端据此展示登录引导
- 会员（user_type = 1）和非网（user_type = 2）正常返回完整榜单数据
- **未携带有效 Token 时返回 401**

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "total": 603,
    "list": [
      {
        "rank": 1,
        "user_id": 208,
        "jingwang_id": "94796405",
        "nickname": "远弱",
        "consumed": 999,
        "level": 3,
        "level_name": "AI工作流达人",
        "is_me": false,
        "unlocked_benefits": [
          { "type": "pendant_3", "name": "挂件3" },
          { "type": "return_card_400", "name": "400Token定额返场卡" }
        ],
        "next_level_need": 0
      }
    ],
    "my_rank": {
      "rank": 15,
      "user_id": 1,
      "jingwang_id": "90123456",
      "nickname": "会员张三",
      "consumed": 520,
      "total_token": 1000,
      "level": 2,
      "level_name": "AI工作流领航者",
      "unlocked_benefits": [
        { "type": "pendant_1", "name": "挂件1" },
        { "type": "ebook", "name": "《机构猎手AI选股》电子书" },
        { "type": "pendant_2", "name": "挂件2" },
        { "type": "return_card_200", "name": "200Token定额返场卡" }
      ],
      "guide_text": "再使用 280 Token 成为达人，解锁400Token返场卡"
    }
  }
}
```

---

#### 3.4.2 获取我的排行详情

```
GET /leaderboard/me
```

**需要登录。**

**说明：**
- 会员/非网返回 `is_tourist: false` 和完整的 `my_rank`
- **游客（user_type = 3）返回 `is_tourist: true`，`my_rank` 为 `null`**
- **未携带有效 Token 时返回 401**

**响应示例（会员/非网）：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "is_tourist": false,
    "my_rank": {
      "rank": 15,
      "user_id": 1,
      "jingwang_id": "90123456",
      "nickname": "会员张三",
      "consumed": 520,
      "total_token": 1000,
      "level": 2,
      "level_name": "AI工作流领航者",
      "unlocked_benefits": [
        { "type": "pendant_1", "name": "挂件1" },
        { "type": "ebook", "name": "《机构猎手AI选股》电子书" },
        { "type": "pendant_2", "name": "挂件2" },
        { "type": "return_card_200", "name": "200Token定额返场卡" }
      ],
      "guide_text": "再使用 280 Token 成为达人，解锁400Token返场卡"
    }
  }
}
```

**响应示例（游客）：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "is_tourist": true,
    "my_rank": null
  }
}
```

---

### 3.5 Activity 模块 — 活动

#### 3.5.1 获取活动配置

```
GET /activity/config
```

**无需登录。** 用于首页/排行榜页展示活动信息、倒计时。

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "activity_name": "AI时代下的精英成长计划「TOKEN传奇榜」",
    "slogan": "麻雀战，你训练，我花钱！",
    "end_time": "2026-04-24 23:59:59",
    "countdown_seconds": 1234567,
    "initial_token": 1000,
    "level_rules": [
      { "level": 1, "min_consumed": 200, "title": "AI工作流探索者" },
      { "level": 2, "min_consumed": 500, "title": "AI工作流领航者" },
      { "level": 3, "min_consumed": 800, "title": "AI工作流达人" }
    ]
  }
}
```

---

#### 3.5.2 记录页面访问

```
POST /activity/visit
```

**需要登录。** 埋点接口。

**请求参数：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | string | 是 | 页面标识：`home`、`leaderboard`、`login` |

---

### 3.6 Home 模块 — 首页数据

#### 3.6.1 今日市场概览

```
GET /home/market
```

**无需登录。** 返回11个指数假数据。

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "items": [
      { "name": "上证指数", "price": 3052.37, "change": 12.45, "percent": 0.41 },
      { "name": "深证成指", "price": 9788.65, "change": -23.18, "percent": -0.24 }
    ]
  }
}
```

---

#### 3.6.2 滚动文案

```
GET /home/announcements
```

**无需登录。**

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "items": [
      "Hi！你好！欢迎来到DeepChart！",
      "新用户注册立享100Token+深度能量1个月",
      "并可免费使用深度机构六大模板七天！"
    ]
  }
}
```

---

#### 3.6.3 深度探索模板

```
GET /home/templates
```

**无需登录。** 返回7个模板。

**响应示例：**

```json
{
  "code": 0,
  "message": "OK",
  "data": {
    "items": [
      { "id": 1, "name": "机构猎手", "icon": "icon-1" },
      { "id": 2, "name": "AI诊股", "icon": "icon-2" }
    ]
  }
}
```

---

## 四、页面交互需求

### 4.1 登录页

**核心交互逻辑：**

```
用户输入账号密码 → 点击登录按钮
        ↓
    判断是否勾选协议？
        ↓ 否
    底部 Toast："请勾选用户协议和隐私政策"
    + 弹窗显示协议内容
        ↓
    用户点击弹窗"确认/同意"
        ↓
    自动勾选协议 ✓
    Toast："已勾选协议，请再次点击登录"
        ↓
    用户再次点击登录 → 正常发请求
```

**要点：**
- 未勾选协议时，**不发请求**，前端拦截
- 弹窗确认后自动勾选，**不需要用户手动去点 checkbox**
- `agreed_policy` 传 `true` 时后端才放行

---

### 4.2 首页

**页面结构（从上到下）：**

1. **机器人对话框** — 文案每隔 2s 向上滚动，循环展示3条
2. **搜索框** — 最多输入20字，点击发送跳转缺省页
3. **今日市场概览** — 11个指数卡片，假数据，点击跳转缺省页
4. **DeepMate 区域** — 机构猎手（文案每3s向右滚动）+ AI诊股（假数据）
5. **深度探索** — 7个模板，可横向滑动，点击跳转缺省页
6. **我的自选** — 展示样式，点击跳转缺省页
7. **机构动向简报** — 展示样式，点击跳转缺省页
8. **AI生成提示** — 底部提示文案
9. **底部导航栏** — 首页高亮，其他点击跳转缺省页

**弹窗逻辑：**
- 进入首页，**会员自动展示弹窗**（活动引导）
- 弹窗内容：活动标题 + 描述 + "立即参加"按钮
- 点击"立即参加" → 跳转排行榜页
- 点击其他区域 → 关闭弹窗
- 非会员不展示弹窗

---

### 4.3 排行榜页

**页面结构：**

1. **顶部返回按钮** — 返回首页
2. **活动标题区** — 主标题 + 副标题「TOKEN传奇榜」+ 口号 + **倒计时**
3. **我的训练情况** — 当前用户排名、消耗进度条、等级称号、权益列表、进度引导文案
4. **参战人数** — 右侧显示 "xx人参战"
5. **排名列表** — 按消耗Token降序，展示前8名，底部有「展开全部」按钮（>8人时）
6. **活动介绍** — 文案说明

**进度引导文案规则：**

| 消耗量 | 显示文案 |
|--------|----------|
| < 200 | "再使用 X Token 即可成为AI工作流探索者，获得电子书×1" |
| 200 ~ 499 | "再使用 Y Token 升级为领航者，解锁200Token返场卡" |
| 500 ~ 799 | "再使用 Z Token 成为达人，解锁400Token返场卡" |
| ≥ 800 | "恭喜已达最高等级！继续训练冲击传奇榜榜首" |

**游客状态：**
- 游客使用游客账号（99开头，user_type = 3）正常登录，携带有效 JWT
- 调用 `/leaderboard` 时后端检测到 user_type = 3，返回空列表（`total: 0, list: []`），前端列表区域展示"登录后查看完整榜单"引导
- 调用 `/leaderboard/me` 时后端返回 `is_tourist: true, my_rank: null`，前端"我的训练情况"区域展示登录提示
- 页面底部固定展示登录提示条
- 未登录（未携带 Token）直接访问排行榜接口，后端返回 **401**

---

### 4.4 缺省页

所有未实现的功能点击后统一跳转缺省页：
- 顶部返回按钮（返回首页）
- 中间显示 "功能开发中"

---

## 五、错误码对照表

| code | 含义 | 处理建议 |
|------|------|----------|
| 0 | 成功 | — |
| 50 | 账号或密码错误 | 提示用户检查输入 |
| 51 | 参数校验失败 | 按 message 提示用户 |
| 401 | 未授权/Token过期 | 清除token，跳转登录页 |

---

**精网号规则：**
- 会员：90 开头
- 非网：94 开头
- 游客：99 开头

---

## 七、Axios 封装示例

```js
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',           // 开发时代理到 localhost:8000
  timeout: 10000
})

// 请求拦截器：自动加 JWT
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：统一处理错误
request.interceptors.response.use(
  response => {
    const { code, message, data } = response.data
    if (code !== 0) {
      // 按 message 提示用户
      return Promise.reject(new Error(message))
    }
    return data
  },
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // 跳转登录页
    }
    return Promise.reject(error)
  }
)

export default request
```

---

## 八、Vue Router 配置建议

```js
const routes = [
  { path: '/login', component: LoginView },
  { path: '/home', component: HomeView, meta: { keepAlive: true } },
  { path: '/leaderboard', component: LeaderboardView },
  { path: '/default', component: DefaultView }
]
```

**底部导航栏路由：**

| 标签 | 路由 | 说明 |
|------|------|------|
| 首页 | `/home` | 高亮 |
| 行情 | `/default` | 缺省页 |
| DeepMate | `/default` | 缺省页 |
| 深度探索 | `/default` | 缺省页 |
| 我的 | `/default` | 缺省页 |

---

---

## 九、前端自行处理的逻辑

以下逻辑**无需后端接口**，前端自行计算或写死即可：

### 9.1 进度引导文案

**后端已直接返回 `guide_text` 字段**，前端直接展示即可，无需自行拼接。文案规则如下：

| 消耗量 | 后端返回的 `guide_text` 示例 |
|--------|----------|
| < 200 | "再使用 X Token 即可成为AI工作流探索者，获得电子书×1" |
| 200 ~ 499 | "再使用 Y Token 升级为领航者，解锁200Token返场卡" |
| 500 ~ 799 | "再使用 Z Token 成为达人，解锁400Token返场卡" |
| ≥ 800 | "恭喜已达最高等级！继续训练冲击传奇榜榜首" |

### 9.2 机构猎手文案

DeepMate 区域机构猎手模块的滚动文案，前端直接写死假数据即可，不需要调后端接口。

### 9.3 消耗统计

排行榜页只展示消耗 **总量**，从 `/user/profile` 的 `total_consumed` 或排行榜列表里取即可。后端**不返回**消耗历史明细。

---

**文档版本：** v1.3.0  
**更新日期：** 2026-06-03  
**后端联系人：** （你自己填）