//mock接口调用
// 统一管理用户相关接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userResponseData,
} from './type_old'

enum API {
  LOGIN_URL = '/user/login',

  USERINFO_URL = '/user/info',

  LOGOUT_URL = '/user/logout',
}

//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

//获取用户信息
export const getUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
