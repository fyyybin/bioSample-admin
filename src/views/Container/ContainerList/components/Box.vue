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
                            <img style="padding: 0 5px; height: 30px" src="@/assets/images/container/入库.png" title="样本入库" @click="dialogAdd" />
                            <img style="padding: 0 5px; height: 30px" src="@/assets/images/container/出库.png" title="样本出库" @click="dialogOut" />
                            <img style="padding: 0 5px; height: 30px" src="@/assets/images/container/删除.png" title="样本废弃" @click="dialogDel" />
                        </div>
                    </div>
                </div>

                <div class="infor_1" style="display: block; margin-top: 20px" v-if="container.displayItem">
                    <ul class="infor_btn">
                        <h3 style="margin: 8px; color: #ffffff">基本信息</h3>
                    </ul>
                    <div class="infor_text">
                        <div style="width: 100%; font-size: 12px">
                            <p style="padding: 0 2px">样本源编号:{{ displayCell.样本源编号 }}</p>
                            <p style="padding: 0 2px">样本源姓名:{{ displayCell.样本源姓名 }}</p>
                            <p style="padding: 0 2px">样本类型:{{ displayCell.样本类型 }}</p>
                            <p style="padding: 0 2px">所属样本组:{{ displayCell.采集医院 }}</p>
                            <p style="padding: 0 2px">样本量:{{ displayCell.样本量 }}</p>
                            <p style="padding: 0 2px">样本状态:{{ displayCell.入库状态 }}</p>
                            <p style="padding: 0 2px">入库时间:{{ displayCell.入库时间 }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogVisibleAdd" title="样本入库" width="1000">
        <el-table :data="addCellList" border style="width: 100%; height: 400px" @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="55" />
            <el-table-column prop="样本源编号" width="240" label="样本源编号" />
            <el-table-column prop="样本源姓名" width="100" label="样本源姓名" />
            <el-table-column prop="样本源类型" width="100" label="样本源类型" />
            <el-table-column prop="样本类型" width="100" label="样本类型" />
            <el-table-column prop="样本量" width="100" label="样本量" />

            <el-table-column prop="采集医院" width="210" label="所属样本组" />
            <el-table-column fixed="right" prop="入库状态" width="100" label="样本状态">
                <template #default="scope">
                    <el-tag :type="scope.row.入库状态 === '待入库' ? 'primary' : 'warning'">{{ scope.row.入库状态 }}</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleAdd = false">取消</el-button>
                <el-button type="primary" @click="Add()"> 确认 </el-button>
            </div>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogVisibleOut" title="样本出库" width="800">
        <el-row>
            <el-col :span="12" style="font-size: 14px">
                <el-form label-width="auto" style="max-width: 600px">
                    <el-form-item label="样本源编号"> {{ displayCell.样本源编号 }} </el-form-item>
                    <el-form-item label="样本源年龄"> {{ displayCell.年龄 }} </el-form-item>
                    <el-form-item label="样本源性别"> {{ displayCell.性别 }} </el-form-item>
                    <el-form-item label="样本类型"> {{ displayCell.样本类型 }} </el-form-item>
                    <el-form-item label="样本量"> {{ displayCell.样本量 }} </el-form-item>
                    <el-form-item label="位置"> {{ displayCell.位置 }} </el-form-item>
                    <el-form-item label="入库时间"> {{ displayCell.入库时间 }} </el-form-item>
                </el-form>
            </el-col>

            <el-col :span="12" style="width: 45%; font-size: 14px">
                <el-form :model="formDataOut" label-width="auto" style="max-width: 600px">
                    <el-form-item style="padding: 0 2px" label="申请人姓名">
                        <el-input v-model="formDataOut.申请人姓名" />
                    </el-form-item>
                    <el-form-item label="申请人联系方式">
                        <el-input v-model="formDataOut.申请人联系方式" />
                    </el-form-item>
                    <el-form-item label="出库时间">
                        <el-date-picker v-model="formDataOut.出库时间" type="date" placeholder="选择日期" style="width: 100%" />
                    </el-form-item>
                    <el-form-item label="研究用途">
                        <el-input v-model="formDataOut.研究用途" type="textarea" />
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleOut = false">取消</el-button>
                <el-button type="primary" @click="Out"> 确认 </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisibleDel" title="样本废弃" width="600">
        <el-form :model="formDataDel" label-width="auto" style="max-width: 600px">
            <el-form-item style="padding: 0 2px" label="申请人姓名">
                <el-input v-model="formDataDel.申请人姓名" />
            </el-form-item>
            <el-form-item label="申请人联系方式">
                <el-input v-model="formDataDel.申请人联系方式" />
            </el-form-item>
            <el-form-item label="废弃时间">
                <el-date-picker v-model="formDataDel.废弃时间" type="date" placeholder="选择日期" style="width: 100%" />
            </el-form-item>
            <el-form-item label="废弃原因">
                <el-input v-model="formDataDel.废弃原因" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleDel = false">取消</el-button>
                <el-button type="primary" @click="Del()"> 确认 </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import CellBox from '@/components/CellBox.vue';
import { ElMessage } from 'element-plus';
import { useContainerStore, useUserStore } from '@/store';
import { CellAddAPI, CellDelAPI, CellStorageAPI, CellOutAPI } from '@/http/api';
const container = useContainerStore();
const userStore = useUserStore();
const props = defineProps({
    msg: Array,
    name: String,
    level: Number,
});
// console.log(props.msg);

const addCellList = ref([]);
const dialogVisibleOut = ref(false);
const dialogVisibleAdd = ref(false);
const dialogVisibleDel = ref(false);
// const num1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const formDataOut = reactive({
    申请人姓名: '',
    申请人联系方式: '',
    出库时间: '',
    研究用途: '',
});
const formDataDel = reactive({
    申请人姓名: '',
    申请人联系方式: '',
    废弃时间: '',
    废弃原因: '',
});
const displayCell = ref([]);
interface FormData {
    位置: number;
    样本源编号: string;
    样本源姓名: string;
    样本类型: string;
    所属样本组: string;
    样本量: string;
    入库时间: string;
}
const typeColor = (item) => {
    if (item == '已入库') return 'success';
    else if (item == '待入库') return 'warning';
    else if (item == '废弃审核') return 'warning';
    else if (item == '出库审核') return 'warning';
};
const multipleSelection = ref<FormData[]>([]);
const handleSelectionChange = (val: FormData[]) => {
    multipleSelection.value = val;
};

const getCell = (data) => {
    displayCell.value = data;
    // console.log(displayCell.value);
    if (data.样本类型 !== '暂无') {
        container.displayItem = true;
    } else {
        container.displayItem = false;
    }
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

// 细胞入库
const dialogAdd = () => {
    if (displayCell.value.样本类型 !== '暂无') {
        ErrorMessage('请选择一个空闲的位置！');
    } else {
        CellAddAPI().then((res) => {
            addCellList.value = res.data.result;
        });
        dialogVisibleAdd.value = true;
    }
};
const Add = () => {
    if (multipleSelection.value[0].入库状态 === '审核中') {
        ErrorMessage('该样本已在入库审核！');
    } else {
        const formData = new FormData();
        formData.append('样本源编号', multipleSelection.value[0].样本源编号);
        formData.append('位置', container.breadcrumbCell + '/' + displayCell.value.POS);
        formData.append('name', userStore.userInfo);
        CellStorageAPI(formData).then((res) => {});
        dialogVisibleAdd.value = false;
    }
};
// 细胞出库
const dialogOut = () => {
    if (displayCell.value.样本源编号) {
        dialogVisibleOut.value = true;
    } else {
        ErrorMessage('请选择一个需要出库的细胞');
    }
};
// 细胞出库
const Out = () => {
    if (formDataOut.申请人姓名 === '' || formDataOut.申请人联系方式 === '' || formDataOut.出库时间 === '' || formDataOut.研究用途 == '') {
        ErrorMessage('内容不能为空！');
    } else {
        const formData = new FormData();
        Object.keys(formDataOut).forEach((key) => {
            formData.append(key, formDataOut[key]);
        });
        formData.append('样本源编号', displayCell.value.样本源编号);
        formData.append('name', userStore.userInfo);

        // api
        CellOutAPI(formData).then((res) => {
            SuccessMessage('出库样本进入审批');
            dialogVisibleOut.value = false;
        });
    }
};

// 选择需要删除的item
const dialogDel = () => {
    if (displayCell.value.样本源编号) {
        dialogVisibleDel.value = true;
    } else {
        ErrorMessage('请选择一个需要出库的细胞');
    }
};
const Del = () => {
    if (formDataOut.申请人姓名 === '' || formDataOut.申请人联系方式 === '' || formDataOut.出库时间 === '' || formDataOut.研究用途 == '') {
        ErrorMessage('内容不能为空！');
    } else {
        const formData = new FormData();
        Object.keys(formDataDel).forEach((key) => {
            formData.append(key, formDataDel[key]);
        });
        formData.append('样本源编号', displayCell.value.样本源编号);
        formData.append('name', userStore.userInfo);
        CellDelAPI(formData).then((res) => {
            SuccessMessage('删除样本进入审批');
            dialogVisibleDel.value = false;
        });
    }
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
            background: #66c0b8;
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
