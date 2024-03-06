<template>
    <div style="display: flex">
        <CellBox :msg="props.msg" @cellDetail="getCell"></CellBox>
        <div class="infor">
            <div style="display: block">
                <div class="infor_1" style="display: block">
                    <ul class="infor_btn">
                        <h3 style="margin: 8px; color: #ffffff">操作</h3>
                    </ul>
                    <div class="infor_img">
                        <div style="width: 100%; list-style: none; overflow: hidden">
                            <img style="padding: 0 5px; height: 30px" src="@/assets/images/container/ybtj.png" title="样本添加" @click="dialogVisibleAdd = true" />
                            <img style="padding: 0 5px; height: 30px" src="@/assets/images/container/ybsc.png" title="样本删除" @click="dialogVisibleDel = true" />
                        </div>
                    </div>
                </div>

                <div class="infor_1" style="display: block; margin-top: 20px" v-if="container.displayItem">
                    <ul class="infor_btn">
                        <h3 style="margin: 8px; color: #ffffff">基本信息</h3>
                    </ul>
                    <div class="infor_text">
                        <div style="width: 100%; font-size: 12px">
                            <p style="padding: 0 2px">样本复份编号:{{ displayCell.样本复份编号 }}</p>
                            <p style="padding: 0 2px">样本源编号:{{ displayCell.样本源编号 }}</p>
                            <p style="padding: 0 2px">样本源姓名:{{ displayCell.样本源姓名 }}</p>
                            <p style="padding: 0 2px">样本类型:{{ displayCell.样本类型 }}</p>
                            <p style="padding: 0 2px">所属样本组:{{ displayCell.所属样本组 }}</p>
                            <p style="padding: 0 2px">样本状态:{{ displayCell.样本状态 }}</p>
                            <p style="padding: 0 2px">样本量:{{ displayCell.样本量 }}</p>
                            <p style="padding: 0 2px">入库时间:{{ displayCell.入库时间 }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisibleAdd" title="样本添加" width="800">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="样本复份编号">
                <el-input v-model="form.样本复份编号" size="small" style="width: 240px" />
            </el-form-item>
            <el-form-item label="样本源编号">
                <el-input v-model="form.样本源编号" size="small" style="width: 240px" />
            </el-form-item>
            <el-form-item label="样本源姓名">
                <el-input v-model="form.样本源姓名" size="small" style="width: 240px" />
            </el-form-item>
            <el-form-item label="样本类型">
                <el-select v-model="form.样本类型" size="small" style="width: 240px" placeholder="选择类型">
                    <el-option label="细胞" value="细胞" />
                    <el-option label="全血" value="全血" />
                    <el-option label="DNA" value="DNA" />
                    <el-option label="RNA" value="RNA" />
                    <el-option label="分泌物" value="分泌物" />
                    <el-option label="胆汁" value="胆汁" />
                </el-select>
            </el-form-item>

            <el-form-item label="所属样本组">
                <el-select v-model="form.所属样本组" size="small" style="width: 240px" placeholder="选择样本组">
                    <el-option label="浙江大学医学院附属第一医院" value="浙江大学医学院附属第一医院" />
                    <el-option label="浙江大学医学院附属第四医院" value="浙江大学医学院附属第四医院" />
                    <el-option label="台州医院" value="台州医院" />
                    <el-option label="浙江大学医学院附属儿童医院" value="浙江大学医学院附属儿童医院" />
                </el-select>
            </el-form-item>
            <el-form-item label="样本量">
                <el-input v-model="form.样本量" size="small" style="width: 240px" />
            </el-form-item>
            <el-form-item label="位置">
                <el-input v-model="form.position" size="small" style="width: 40px" placeholder="1A" />
            </el-form-item>
            <el-form-item label="路径">
                <el-input disabled size="small" style="width: 600px" :placeholder="container.breadcrumbCell" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleAdd = false">取消</el-button>
                <el-button type="primary" @click="Add()"> 确认 </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisibleDel" title="样本删除" width="1000">
        <el-table :data="props.msg" style="width: 100%; height: 400px" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="position" label="位置" />
            <el-table-column prop="样本复份编号" width="120" label="样本复份编号" />
            <el-table-column prop="样本源编号" width="120" label="样本源编号" />
            <el-table-column prop="样本源姓名" width="100" label="样本源姓名" />
            <el-table-column prop="样本类型" label="样本类型" />
            <el-table-column prop="所属样本组" width="210" label="所属样本组" />
            <el-table-column prop="样本量" label="样本量" />
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleDel = false">取消</el-button>
                <el-button type="primary" @click="Del()"> 删除 </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import CellBox from '@/components/CellBox.vue';
import { ElMessage } from 'element-plus';
import { useContainerStore, useUserStore } from '@/store';
import { CellAddAPI, CellDelAPI } from '@/http/api';
const container = useContainerStore();
const userStore = useUserStore();
const props = defineProps({
    msg: Array,
    name: String,
    level: Number,
});
const dialogVisibleAdd = ref(false);
const dialogVisibleDel = ref(false);
const num1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const form = reactive({
    position: '',
    样本复份编号: '',
    样本源编号: '',
    样本源姓名: '',
    样本类型: '',
    所属样本组: '',
    样本量: '',
});
const displayCell = ref([]);

const getCell = (data) => {
    // console.log(data, '父组件已成功接受到参数');
    displayCell.value = data;
    container.displayItem = true;
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
// 添加细胞样本
const Add = () => {
    if (num1.indexOf(form.position[1]) > -1) {
        const now = new Date();
        const cellData = {
            position: num1.indexOf(form.position[1]) * 9 + Number(form.position[0]),
            样本复份编号: form.样本复份编号,
            样本源编号: form.样本源编号,
            样本源姓名: form.样本源姓名,
            样本类型: form.样本类型,
            所属样本组: form.所属样本组,
            样本量: form.样本量,
            入库时间: now.getFullYear() + ('0' + (now.getMonth() + 1)).slice(-2) + ('0' + now.getDate()).slice(-2),
        };

        if (container.judgeCellState(cellData, props.msg)) {
            const formData = new FormData();
            Object.keys(cellData).forEach((key) => {
                formData.append(key, cellData[key]);
            });
            formData.append('name', userStore.userInfo.name);
            // console.log(formData);

            CellAddAPI(formData).then((res) => {
                SuccessMessage('添加样本进入审批');
                dialogVisibleAdd.value = false;
            });
        } else {
            ErrorMessage('该位置已存在样本');
        }
    } else {
        ErrorMessage('请输入正确格式的位置');
    }
};

// 选择需要删除的item

interface FormData {
    position: number;
    样本复份编号: string;
    样本源编号: string;
    样本源姓名: string;
    样本类型: string;
    所属样本组: string;
    样本量: string;
    入库时间: string;
}

const multipleSelection = ref<FormData[]>([]);
const handleSelectionChange = (val: FormData[]) => {
    multipleSelection.value = val;
};

const Del = () => {
    const formData = new FormData();
    Object.keys(multipleSelection.value).forEach((key) => {
        formData.append(key, multipleSelection.value[key]);
    });
    formData.append('name', userStore.userInfo.name);
    CellDelAPI(formData).then((res) => {
        SuccessMessage('删除样本进入审批');
        dialogVisibleDel.value = false;
    });
    console.log(multipleSelection.value);
};
</script>

<style scoped>
.infor {
    width: 30%;
    display: block;
    padding-left: 100px;
    margin-top: 50px;
    margin-left: 80px;
    .infor_1 {
        width: 300px;
        border-radius: 5px;
        box-shadow: 0 0 10px #ccc;
        .infor_btn {
            width: 300px !important;
            float: left;
            border-radius: 5px 5px 0 0;
            padding-left: 0;
            background: #71aed7;
            margin: 0;
            text-align: center;
        }
        .infor_text {
            display: flex;
            justify-content: left;
            padding: 0 20px 10px 20px;
        }
        .infor_img {
            display: flex;
            justify-content: left;
            padding: 10px 20px 3px 20px;
        }
    }
}
</style>
