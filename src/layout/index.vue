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
const route = useRoute();
const breadcrumb = useBreadCrumb();
const collapse = useCollapseStore();
const MenuList = [
    {
        path: '/',
        name: 'home',
        component: '/home/index',
        meta: {
            icon: 'HomeFilled',
            title: '首页',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: true,
            isKeepAlive: true,
        },
    },
    {
        path: '/Container',
        name: 'Container',
        meta: {
            icon: 'Histogram',
            title: '容器',
            isLink: '',
            isHide: false,
            isFull: true,
            isAffix: false,
            isKeepAlive: true,
        },
        children: [
            {
                path: '/container/list',
                name: 'ContainerList',
                meta: {
                    icon: 'Menu',
                    title: '容器列表',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/container/transport',
                name: 'ContainerTransport',
                meta: {
                    icon: 'Menu',
                    title: '容器转移',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
        ],
    },
    {
        path: '/sampleSave',
        name: 'sampleSave',
        redirect: '/sampleSave',
        meta: {
            icon: 'MessageBox',
            title: '样本保存',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: true,
        },
        children: [
            {
                path: '/sampleSave/position',
                name: 'transport',
                component: '/sampleSave/position/index',
                meta: {
                    icon: 'Menu',
                    title: '样本位置',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/sampleSave/temperature',
                name: 'temperature',
                component: '/sampleSave/temperature/index',
                meta: {
                    icon: 'Menu',
                    title: '保存温度',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
        ],
    },
    {
        path: '/auth',
        name: 'auth',
        redirect: '/auth/menu',
        meta: {
            icon: 'Lock',
            title: '权限管理',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: true,
        },
        children: [
            {
                path: '/auth/menu',
                name: 'authMenu',
                component: '/auth/menu/index',
                meta: {
                    icon: 'Menu',
                    title: '菜单权限',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/auth/button',
                name: 'authButton',
                component: '/auth/button/index',
                meta: {
                    icon: 'Menu',
                    title: '按钮权限',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
        ],
    },
    {
        path: '/about/index',
        name: 'about',
        component: '/about/index',
        meta: {
            icon: 'InfoFilled',
            title: '关于项目',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: true,
        },
    },
];
breadcrumb.getMenuList(MenuList);
const List = ref(MenuList);
const title = '生物样本数据库';
const activeMenu = computed(() => route.path);
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
