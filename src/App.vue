<template>
    <layout v-if="$route.meta.layout" />
    <router-view v-else></router-view>
</template>

<script lang="ts" setup>
import layout from '@/layout/index.vue';
// 计算主题颜色变化
document.documentElement.style.setProperty('--el-color-primary', '#009688');
document.documentElement.style.setProperty('--el-color-primary-dark-2', '#066f65');
document.documentElement.style.setProperty('--el-color-primary-light-1', '#1aa194');
document.documentElement.style.setProperty('--el-color-primary-light-2', '#33aba0');
document.documentElement.style.setProperty('--el-color-primary-light-3', '#4db6ac');
document.documentElement.style.setProperty('--el-color-primary-light-4', '#66c0b8');
document.documentElement.style.setProperty('--el-color-primary-light-5', '#80cbc4');
document.documentElement.style.setProperty('--el-color-primary-light-6', '#99d5cf');
document.documentElement.style.setProperty('--el-color-primary-light-7', '#b3e0db');
document.documentElement.style.setProperty('--el-color-primary-light-8', '#cceae7');
document.documentElement.style.setProperty('--el-color-primary-light-9', '#e6f5f3');
</script>

<style lang="less">
html,
body,
#app {
    width: 100%;
    height: 100%;
    margin: 0;
}
</style>
