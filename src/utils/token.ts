export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}

//本地存储获取数据
export const GET_TOKEN = (): string => {
  return localStorage.getItem('token') as string
}

export const DEL_TOKEN = (): void => {
  return localStorage.removeItem('token')
}
