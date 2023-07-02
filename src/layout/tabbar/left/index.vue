<template>
  <el-icon @click="isCollapseChange">
    <component :is="LayOutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb class="tabbar_bread" :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      :to="item.path"
      v-show="!item.meta.tBar"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>

      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
// import { ref } from 'vue'
import useLayOutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'
//获取layout配置仓库
let LayOutSettingStore = useLayOutSettingStore()
const $route = useRoute()

const isCollapseChange = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<script lang="ts">
export default {
  name: 'Left',
}
</script>

<style scoped lang="scss">
.tabbar_bread {
  margin-left: 6px;
}
</style>
