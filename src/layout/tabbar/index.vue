<template>
  <div class="tabbar">
    <div class="tabbar_left"><Left></Left></div>
    <div class="tabbar_right"><Right></Right></div>
  </div>
</template>

<script setup lang="ts">
import Right from './right/index.vue'
import Left from './left/index.vue'
</script>

<script lang="ts">
export default {
    name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(to right, white, rgb(240, 173, 231), white);

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
   
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
