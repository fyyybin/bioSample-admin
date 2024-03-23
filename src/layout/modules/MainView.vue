<template>
    <Tabs />
    <el-main>
        <router-view v-slot="{ Component, route }">
            <transition appear name="fade-transform" mode="out-in">
                <!-- <keep-alive> -->
                <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
                <!-- </keep-alive> -->
            </transition>
        </router-view>
    </el-main>
</template>
<script lang="ts" setup>
import { ref, onBeforeUnmount, provide } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import Tabs from './Tabs.vue';
import { useCollapseStore } from '@/store';
const collapse = useCollapseStore();
const isCollapse = collapse.isCollapse;
// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide('refresh', refreshCurrentPage);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
    screenWidth.value = document.body.clientWidth;
    if (!isCollapse && screenWidth.value < 1200) collapse.changeCollapse;
    if (isCollapse && screenWidth.value > 1200) collapse.changeCollapse;
}, 100);
window.addEventListener('resize', listeningWindow, false);
onBeforeUnmount(() => {
    window.removeEventListener('resize', listeningWindow);
});
</script>
<style scoped lang="scss">
.el-main {
    box-sizing: border-box;
    padding: 10px 12px;
    overflow-x: hidden;
    background-color: var(--el-bg-color-page);
}
.el-footer {
    height: auto;
    padding: 0;
}
</style>
