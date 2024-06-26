<template>
    <div class="tabs-box">
        <div class="tabs-menu">
            <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
                <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path" :closable="item.close">
                    <template #label>
                        <el-icon v-show="item.icon" class="tabs-icon">
                            <component :is="item.icon"></component>
                        </el-icon>
                        {{ item.title }}
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs';
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TabsPaneContext, TabPaneName } from 'element-plus';
import { useTabsStore } from '@/store';
const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);

onMounted(() => {
    tabsDrop();
    initTabs();
});

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
    () => route.fullPath,
    () => {
        if (route.meta.isFull) return;
        tabsMenuValue.value = route.fullPath;
        const tabsParams = {
            icon: route.meta.icon as string,
            title: route.meta.title as string,
            path: route.fullPath,
            name: route.name as string,
            close: !route.meta.isAffix,
        };
        tabStore.addTabs(tabsParams);
    },
    { immediate: true },
);

// tabs 拖拽排序
const tabsDrop = () => {
    Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
        draggable: '.el-tabs__item',
        animation: 300,
        onEnd({ newIndex, oldIndex }) {
            const tabsList = [...tabStore.tabsMenuList];
            const currRow = tabsList.splice(oldIndex as number, 1)[0];
            tabsList.splice(newIndex as number, 0, currRow);
            tabStore.setTabs(tabsList);
        },
    });
};

// 初始化需要固定的 tabs
const initTabs = () => {
    const tabsParams = {
        icon: 'HomeFilled',
        title: '首页',
        path: '/',
        name: 'home',
        close: true,
    };
    tabStore.addTabs(tabsParams);
};

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
    const fullPath = tabItem.props.name as string;
    router.push(fullPath);
};

// Remove Tab
const tabRemove = (fullPath: TabPaneName) => {
    const params = {
        tabPath: fullPath as string,
        isCurrent: fullPath == route.fullPath,
        router: router,
    };
    tabStore.removeTabs(params);
};
</script>

<style scoped lang="scss">
.tabs-box {
    background-color: var(--el-bg-color);
    .tabs-menu {
        position: relative;
        width: 100%;
        .el-dropdown {
            position: absolute;
            top: 8px;
            right: 13px;
        }
        :deep(.el-tabs) {
            .el-tabs__header {
                box-sizing: border-box;
                height: 40px;
                padding: 0 10px;
                margin: 0;
                .el-tabs__nav-wrap {
                    position: absolute;
                    width: calc(100% - 110px);
                    .el-tabs__nav {
                        display: flex;
                        border: none;
                        .el-tabs__item {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #afafaf;
                            border: none;
                            .tabs-icon {
                                margin: 1.5px 4px 0 0;
                                font-size: 15px;
                            }
                            .is-icon-close {
                                margin-top: 1px;
                            }
                            &.is-active {
                                color: var(--el-color-primary);
                                &::before {
                                    position: absolute;
                                    bottom: 0;
                                    width: 100%;
                                    height: 0;
                                    content: '';
                                    border-bottom: 2px solid var(--el-color-primary) !important;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
