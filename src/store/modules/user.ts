//创建用户相关小仓库
import { defineStore } from 'pinia'
//引入数据类型
// import type { loginFormData, loginResponseData } from '@/api/user/type'
//引入接口
import { reqLogin, getUserInfo, reqLogout } from '@/api/user'
import { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, DEL_TOKEN } from '@/utils/token'
import { routerList } from '@/router/routes' //引入路由
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'

//创建用户小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: routerList, //仓库存储生成菜单需要路由
      username: '',
      avatar: '',
    }
  },
  //异步|逻辑的地方
  actions: {
    //用户登录方法
    async userLogin(data: loginFormData) {
      console.log(data)
      //登录请求
      const result: loginResponseData = await reqLogin(data)
      console.log(result)
      if (result.code == 200) {
        console.log(result)
        //由于pinial|vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储持久化存储
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        // return Promise.reject(new Error(result.data.message))
        return Promise.reject(new Error(result.message))
      }
    },
    async userInfo() {
      //获取用户信息进行存储仓库中[用户头像、名称]
      let result: userInfoResponseData = await getUserInfo()
      console.log(result)
      if (result.code == 200) {
        this.username = result.data.name as string
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      //TODO server interface
      let result: any = await reqLogout()
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        DEL_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露仓库
export default useUserStore
