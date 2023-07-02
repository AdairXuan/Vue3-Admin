<template>
  <div class="logo">
    <img :src="setting.logo" v-if="setting.logoHidden" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<script lang="ts">
export default {
  name: 'Logo',
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  align-items: center;
  color: white;
  padding-top: 10px;
  // padding: 20px;
  img {
    height: 80px;
    width: 80px;
  }

  p {
    font-size: $base-menu-logo-font-size;
  }
}
</style>
