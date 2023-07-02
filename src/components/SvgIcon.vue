<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
//接收传参
defineProps({
  //xlink:href属性的前缀
  prefix: {
    type: String,
    default: '#icon-',
  },
  //SVG图片名字
  name: String,
  //图片颜色
  color: {
    type: String,
    default: '',
  },
  //SVG高度
  height: {
    type: String,
    default: '16px',
  },
  //SVG宽度
  width: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped></style>
