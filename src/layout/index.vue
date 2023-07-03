<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div
      class="layout_slider"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="layout_scrollbar">
        <!-- 菜单组件 -->
        <!-- collapse:折叠 -->
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          :collapse="LayOutSettingStore.fold"
          mode="vertical"
        >
          <!-- <el-menu-item index="1">首页</el-menu-item>
                <el-menu-item index="2">数据大屏</el-menu-item>
                <el-sub-menu index="3">
                    <template #title><span>权限管理</span></template>
                    <el-menu-item index="3-1">用户管理</el-menu-item>
                    <el-menu-item index="3-2">角色管理</el-menu-item>
                    <el-menu-item index="3-3">菜单管理</el-menu-item>
                </el-sub-menu> -->
          <!-- 根据路由动态生成菜单 -->
          <Menu
            :menu_list="userStore.menuRoutes"
            :isCollapse="LayOutSettingStore.fold"
          ></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ fold: LayOutSettingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/user' //引入用户仓库
// import { ref } from 'vue'
import { useRoute } from 'vue-router'
//内容展示区
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useLayOutSettingStore from '@/store/modules/setting'
//获取配置仓库
const LayOutSettingStore = useLayOutSettingStore()
const $route = useRoute()
const userStore = useUserStore()
console.log(userStore.menuRoutes)
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    height: 100vh;
    width: $base-menu-width;
    background-color: $base-menu-background-color;
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }

    .layout_scrollbar {
      height: calc(100vh - $base-menu-logo-height);
      width: 100%;
      padding-top: 10px;

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: white;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    // background: yellow;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
