// d:\wgz\Token\src\views\api\auth.ts

// 修复点：根据目录结构，从 src/views/api 到 src/utils 需要向上两级
import request from '../../utils/request'

// 登录
export const login = (data: { account: string; password: string }) => {
  return request.post('/auth/login', data)
}

// 获取用户信息
export const getUserInfo = () => {
  return request.get('/user/info')
}

// 退出登录
export const logout = () => {
  return request.post('/auth/logout')
}
