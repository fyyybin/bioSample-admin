<template>
    <el-container class="layout">
        <el-aside>
            <div class="aside-box" :style="{ width: collapse.isCollapse ? '65px' : '210px' }">
                <div class="logo flx-center">
                    <img class="logo-img" src="@/assets/icons/logo.svg" alt="logo" />
                    <span v-show="!collapse.isCollapse" class="logo-text">{{ title }}</span>
                </div>
                <el-scrollbar>
                    <el-menu :default-active="activeMenu" :router="true" :unique-opened="true" :collapse-transition="false" :collapse="collapse.isCollapse">
                        <sub-menu :MenuList="List"></sub-menu>
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <ToolBarLeft />
                <ToolBarRight />
            </el-header>
            <MainView />
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import SubMenu from './modules/SubMenu.vue';
import MainView from './modules/MainView.vue';
import ToolBarLeft from './modules/ToolBarLeft.vue';
import { useBreadCrumb, useCollapseStore } from '@/store';
import { useRoute } from 'vue-router';
import ToolBarRight from './modules/ToolBarRight.vue';
import { MenuList } from '@/assets/mockdata';

const route = useRoute();
const breadcrumb = useBreadCrumb();
const collapse = useCollapseStore();
// const router = useRouter();
breadcrumb.getMenuList(MenuList);
const List = ref(MenuList);
const title = '生物样本数据库';
const activeMenu = computed(() => route.path);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
