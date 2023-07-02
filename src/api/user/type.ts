//登录请求对象
export interface loginFormData {
  username: string
  password: string
}

//定义全部接口返回数据都有的数据类型

export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface loginResponseData extends ResponseData {
  data: string
}

export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
