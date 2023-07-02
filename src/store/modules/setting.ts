//layout组件相关配置仓库
import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false, //用户控制菜单是折叠还是收起
            refresh: false, //刷新页面
        }
    }
})

export default useLayOutSettingStore;