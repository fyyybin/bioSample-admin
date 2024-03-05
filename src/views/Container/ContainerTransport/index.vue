<template>
    <div class="content">
        <div class="left">
            <el-button @click="dialogVisibleOldTrans = true">请选择转移前的容器</el-button>
        </div>
        <div class="right">
            <el-button>请选择转移前的容器</el-button>
        </div>
    </div>
    <el-dialog v-model="dialogVisibleOldTrans" title="请选择转移前的容器" width="500">
        <el-tree :data="containerTree" :props="{ label: 'label', children: 'children', disabled: 'disabled' }" :expand-on-click-node="false" show-checkbox>
            <template #default="{ node, data }">
                <el-icon style="padding: 0 5px 0 0">
                    <component :is="data.icon"></component>
                </el-icon>
                <span> {{ node.label }}</span>
            </template>
        </el-tree>
    </el-dialog>
    <el-dialog v-model="dialogVisibleNewTrans" title="请选择转移后的容器" width="500">
        <!-- <el-tree
            ref="treeForm"
            style="margin-top: 15px; padding: 0 20px"
            :data="containerTree"
            :props="props"
            show-checkbox
            node-key="id"
            :check-strictly="true"
            @check="handleCheckChange"
            :default-expanded-keys="data"
            :default-checked-keys="treeCheckList"
            @node-click="treeNodeClick"
            :expand-on-click-node="false"
            class="stafftree"
            :default-expand-all="true"
        ></el-tree> -->
    </el-dialog>
</template>
<script setup lang="ts" name="containerList">
import { containerTree } from '@/assets/mockdata';
import { ref } from 'vue';
const dialogVisibleOldTrans = ref(false);
const dialogVisibleNewTrans = ref(false);
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
}
.left {
    width: 40%;
    height: 100%;
    padding: 10px;
    background-color: green;
}
.right {
    width: 40%;
    height: 100%;
    padding: 10px;
    background-color: green;
}
::v-deep .stafftree {
    // 不可全选样式
    .el-tree-node {
        .el-checkbox__input.is-disabled {
            display: none;
        }
    }
}
</style>
