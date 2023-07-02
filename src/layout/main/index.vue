<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'

//控制当前组件是否销毁重建
const flag = ref(true)

const LayOutSettingStore = useLayOutSettingStore()
//监听仓库内部数据是否发生变化
watch(
  () => LayOutSettingStore.refresh,
  () => {
    //点击刷新利用v-if销毁路由组件
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  /* transform: scale(0); */
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  /* transform: scale(1); */
}
</style>
