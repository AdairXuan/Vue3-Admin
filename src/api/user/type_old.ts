// mock数据对象
//登录携带的对象
export interface loginFormData {
  username: string
  password: string
}

interface dataType {
  token?: string
  message?: string
}

//登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

//定义服务器返回的用户数据类型
interface user {
  checkUser: userInfo
}

export interface userResponseData {
  code: number
  data: user
}
