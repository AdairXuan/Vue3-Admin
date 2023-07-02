import { createApp } from 'vue'
import '@/style/index.scss'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register' //svg图片
import gloablComponent from '@/components' //引入自定义插件,注册整个项目全局组件
import router from './router' //引入路由
import pinia from './store';
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn  //ElementPlus国际化配置
})
app.use(gloablComponent)//安装自定义插件
app.use(router)//引入路由
app.use(pinia) //引入pinia
//引入路由守卫(鉴权)
import './permisstion'


app.mount('#app') //将应用挂在到挂载点上
