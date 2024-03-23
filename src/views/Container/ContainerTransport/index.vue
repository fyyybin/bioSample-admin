<template>
    <div style="width: 100%; height: 100%">
        <div class="content">
            <div class="left">
                <el-button type="primary" @click="dialogVisibleOldTrans = true">请选择转移前的容器</el-button>
                <span>{{ oldList }}</span>
                <div>
                    <CellBox :msg="nodeDataOld" @cellDetail="getOldCell" v-if="boxDisplay1"></CellBox>
                </div>
            </div>
            <div class="right">
                <el-button type="primary" @click="dialogVisibleNewTrans = true">请选择转移后的容器</el-button>
                <span>{{ newList }}</span>
                <div>
                    <CellBox :msg="nodeDataNew" @cellDetail="getNewCell" v-if="boxDisplay2"></CellBox>
                </div>
            </div>

            <el-button @click="trans">生成转移单</el-button>
        </div>
        <el-dialog v-model="dialogVisibleOldTrans" title="请选择转移前的容器" width="500">
            <el-tree ref="treeRefOld" :data="container.ContainerList" :props="{ label: 'label', children: 'children', disabled: 'disabled' }" :expand-on-click-node="false" show-checkbox>
                <template #default="{ node, data }">
                    <el-icon style="padding: 0 5px 0 0">
                        <component :is="data.icon"></component>
                    </el-icon>
                    <span> {{ node.label }}</span>
                </template>
            </el-tree>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="resetNodes1">重置</el-button>
                    <el-button @click="getCheckedNodes1">确认</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogVisibleNewTrans" title="请选择转移后的容器" width="500">
            <el-tree ref="treeRefNew" :data="container.ContainerList" :props="{ label: 'label', children: 'children', disabled: 'disabled' }" :expand-on-click-node="false" show-checkbox>
                <template #default="{ node, data }">
                    <el-icon style="padding: 0 5px 0 0">
                        <component :is="data.icon"></component>
                    </el-icon>
                    <span> {{ node.label }}</span>
                </template>
            </el-tree>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="resetNodes2">重置</el-button>
                    <el-button @click="getCheckedNodes2">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts" name="containerList">
import { ref } from 'vue';
import CellBox from '@/components/CellBox.vue';
import { useContainerStore, useUserStore } from '@/store';
import { ElTree } from 'element-plus';
import { CellAPI, CellTransAPI } from '@/http/api';
import { ElMessage } from 'element-plus';
CellAPI().then((res) => {
    container.getContainerList(res.data.data);
});
const container = useContainerStore();
const userStore = useUserStore();
const treeRefOld = ref<InstanceType<typeof ElTree>>();
const treeRefNew = ref<InstanceType<typeof ElTree>>();
const boxDisplay1 = ref(false);
const boxDisplay2 = ref(false);
const dialogVisibleOldTrans = ref(false);
const dialogVisibleNewTrans = ref(false);
const nodeDataOld = ref([]);
const nodeDataNew = ref([]);
const oldList = ref('');
const newList = ref('');
const AllOldCell = ref({});
const AllNewCell = ref({});

const getCheckedNodes1 = () => {
    if (treeRefOld.value!.getCheckedNodes(false, false).length === 1 && treeRefOld.value!.getCheckedNodes(false, false)[0].level === 6) {
        nodeDataOld.value = treeRefOld.value!.getCheckedNodes(false, false)[0].cells;
        container.addBreadCrumbCell(container.ContainerListGet([treeRefOld.value!.getCheckedNodes(false, false)[0].treePos] ?? []));
        oldList.value = container.breadcrumbCell;
        dialogVisibleOldTrans.value = false;
        boxDisplay1.value = true;
    } else {
        ErrorMessage('请选择一个正确容器盒');
    }
};
const resetNodes1 = () => {
    treeRefOld.value!.setCheckedKeys([], false);
};
const getCheckedNodes2 = () => {
    if (treeRefNew.value!.getCheckedNodes(false, false).length === 1 && treeRefNew.value!.getCheckedNodes(false, false)[0].level === 6) {
        nodeDataNew.value = treeRefNew.value!.getCheckedNodes(false, false)[0].cells;
        container.addBreadCrumbCell(container.ContainerListGet([treeRefNew.value!.getCheckedNodes(false, false)[0].treePos] ?? []));
        newList.value = container.breadcrumbCell;
        dialogVisibleNewTrans.value = false;
        boxDisplay2.value = true;
    } else {
        ErrorMessage('请选择一个正确容器盒');
    }
};
const resetNodes2 = () => {
    treeRefNew.value!.setCheckedKeys([], false);
};
const getOldCell = (data) => {
    data.forEach((value, index) => {
        if (value.样本类型 === '暂无') {
            ErrorMessage('请选择需要转移的样本！');
            return;
        }
        if (index === data.length - 1) {
            AllOldCell.value.样本信息 = data;
            AllOldCell.value.用户信息 = userStore.userInfo;
        }
    });
    // selectOld.value.用户信息 = userStore.userInfo;
};
const getNewCell = (data) => {
    data.forEach((value, index) => {
        if (value.样本类型 !== '暂无') {
            ErrorMessage('请选择容器中空的位置！');
            return;
        }
        if (index === data.length - 1) {
            AllNewCell.value.样本信息 = data;
            AllNewCell.value.位置 = newList.value;
        }
    });
    // if (data.样本类型 !== '暂无') {
    //     ErrorMessage('请选择容器中空的位置！');
    // } else {
    //     data['位置'] = newList.value + '/' + data.POS;
    //     selectNew.value = data;
    // }
};

// 提示组件
const ErrorMessage = (message) => {
    ElMessage.error(message);
};
const SuccessMessage = (message) => {
    ElMessage({
        message: message,
        type: 'success',
    });
};
const trans = () => {
    if (AllOldCell.value.样本信息.length === AllNewCell.value.样本信息.length) {
        const data = { oldData: JSON.stringify(AllOldCell.value), newData: JSON.stringify(AllNewCell.value) };
        CellTransAPI(data).then((res) => {
            SuccessMessage('转移审批进入审核阶段！');
        });
        CellAPI().then((res) => {
            container.getContainerList(res.data.data);
        });
    } else {
        ErrorMessage('旧容器和新容器的所选数量不一致!');
    }
};
</script>
<style scoped lang="scss">
.top {
    width: 100%;
    height: 90%;
}
.bottom {
    width: 100%;
    height: 10%;
}
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
    padding: 0 10px 0 10px;
    border: 2px solid var(--el-border-color-light);
    border-radius: 6px;
}
.right {
    width: 40%;
    height: 100%;
    padding: 0 10px 0 10px;
    border: 2px solid var(--el-border-color-light);
    border-radius: 6px;
}
</style>
