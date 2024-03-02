<template>
    <div class="content">
        <div class="contentLeft">
            <el-tree :data="containerTree" :props="{ label: 'label', children: 'children' }" @node-click="handleNodeClick" :expand-on-click-node="false">
                <template #default="{ node, data }">
                    <el-icon style="padding: 0 5px 0 0">
                        <component :is="data.icon"></component>
                    </el-icon>
                    <span> {{ node.label }}</span>
                </template>
            </el-tree>
        </div>
        <div class="contentMain">
            <div class="breadcrumb-box mask-image">
                <el-breadcrumb :separator-icon="ArrowRight">
                    <transition-group nsame="breadcrumb">
                        <el-breadcrumb-item v-for="item in ContainerList" :key="item.label">
                            <div class="el-breadcrumb__inner is-link" @click="onCrumbClick(item)">
                                <el-icon v-show="item.icon" class="breadcrumb-icon">
                                    <component :is="item.icon"></component>
                                </el-icon>
                                <span class="breadcrumb-title">{{ item.label }}</span>
                            </div>
                        </el-breadcrumb-item>
                    </transition-group>
                </el-breadcrumb>
            </div>
            <component :is="views[level - 1]" :msg="nodeData" :name="name" :level="level"></component>
        </div>
        <!-- <div class="contentRight"></div> -->
    </div>
</template>
<script setup lang="ts" name="containerList">
import { containerTree } from '@/assets/mockdata';
import { useContainerStore } from '@/store';
import { computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import Room from './components/room.vue';
import Item from './components/item.vue';
import Line from './components/line.vue';
import Box from './components/Box.vue';
import { ref } from 'vue';
const container = useContainerStore();
container.getContainerList(containerTree);
// const views = [Room, Item, Layer, Frame, Line, Box];
const views = [Room, Item, Item, Item, Line, Box];
const name = ref('');
const level = ref(0);
const nodeData = ref([]);
const handleNodeClick = (data: Tree) => {
    name.value = data.label;
    level.value = data.level;
    if (data.children) {
        nodeData.value = data.children;
    } else {
        nodeData.value = data.cells;
    }
    container.displayItem = false;
};
const ContainerList = computed(() => {
    let ContainerData = container.ContainerListGet([name.value] ?? []);
    return ContainerData;
});
// Click ContainerList
const onCrumbClick = (item) => {
    name.value = item.label;
    level.value = item.level;
};
</script>
<style scoped lang="scss">
.content {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-radius: 6px;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    justify-content: space-around;
    :deep(.contentLeft) {
        width: 20%;
        height: 100%;
        border: 1px solid var(--el-border-color-light);
        .el-tree {
            padding: 10px;
        }
    }
    .contentMain {
        width: 80%;
        height: 100%;
        padding: 0 15px 0 15px;
        border: 1px solid var(--el-border-color-light);

        .breadcrumb-box {
            display: flex;
            align-items: center;
            overflow: hidden;
            padding: 10px;
            .el-breadcrumb {
                white-space: nowrap;
                .el-breadcrumb__item {
                    position: relative;
                    display: inline-block;
                    float: none;
                    .el-breadcrumb__inner {
                        display: inline-flex;
                        &.is-link {
                            color: #303133;
                            &:hover {
                                color: var(--el-color-primary);
                            }
                        }
                        .breadcrumb-icon {
                            margin-top: 2px;
                            margin-right: 6px;
                            font-size: 16px;
                        }
                        .breadcrumb-title {
                            margin-top: 3px;
                        }
                    }
                    &:last-child .el-breadcrumb__inner,
                    &:last-child .el-breadcrumb__inner:hover {
                        color: #606266;
                    }
                    :deep(.el-breadcrumb__separator) {
                        position: relative;
                        top: -1px;
                    }
                }
            }
        }
        /* mask image */
        .mask-image {
            padding-right: 50px;
            mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
        }
    }
    .contentRight {
        width: 20%;
        height: 100%;
    }
}
</style>
