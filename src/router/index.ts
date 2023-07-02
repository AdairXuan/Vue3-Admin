import { createRouter, createWebHashHistory } from 'vue-router'
import { routerList } from './routes'

let router = createRouter({
  //哈希路由模式
  history: createWebHashHistory(),
  routes: routerList,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
