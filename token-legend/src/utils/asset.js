// 统一资源路径工具
// 基于 Vite 的 BASE_URL 把资源拼成相对路径,兼容三种打开方式:
//   1) 直接双击 dist/index.html(file:// 协议)
//   2) 部署在站点根目录
//   3) 部署在子目录
// 入参可为 '/assets/x.png' 或 'assets/x.png',统一去前导斜杠后拼 BASE_URL。
const BASE = import.meta.env.BASE_URL // 当 vite base:'./' 时为 './'

export function asset(path) {
  if (!path) return ''
  return BASE + String(path).replace(/^\/+/, '')
}
