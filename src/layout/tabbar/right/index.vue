<template>
  <!-- 顶部右侧 -->
  <el-button
    type="primary"
    size="small"
    icon="Refresh"
    @click="RefreshPage"
    circle
  ></el-button>
  <el-button
    type="primary"
    size="small"
    icon="FullScreen"
    @click="FullScreen"
    circle
  ></el-button>
  <el-button type="primary" size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 30px; height: 30px;border-radius: 50%;margin: 0px 10px;"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user';
import { useRouter,useRoute } from 'vue-router';
const LayOutSettingStore = useLayOutSettingStore()
const userStore = useUserStore()
const RefreshPage = () => {
  LayOutSettingStore.refresh = !LayOutSettingStore.refresh
}
const $router = useRouter();
const $route = useRoute();
const FullScreen = () => {
  //Dom对象的一个属性:可以用来判断当前是不是全屏模式[全屏：true，不是全屏：false(null)]
  let full = document.fullscreenElement
  if (!full) {
    //使用根节点的方法requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen()
  }else
  {
    //退出全屏
    document.exitFullscreen();
  }
}

const Logout = () => {

  // 1.请求服务器退出登录接口
  // 2.清空用户信息(token、userInfo)
  // 3.跳转登录页
  userStore.userLogout();
  $router.push({path: '/login',query: { redirect: $route.path}});
}

</script>

<script lang="ts">
export default {
  name: 'Right',
}
</script>

<style scoped lang="scss"></style>
