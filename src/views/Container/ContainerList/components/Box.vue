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
                            <p style="padding: 0 2px">样本编号:{{ displayCell.样本编号 }}</p>
                            <p style="padding: 0 2px">样本源姓名:{{ displayCell.样本源姓名 }}</p>
                            <p style="padding: 0 2px">样本源类型:{{ displayCell.样本源类型 }}</p>
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
            <el-table-column prop="样本编号" width="240" label="样本编号" />
            <el-table-column prop="样本源姓名" width="100" label="样本源姓名" />
            <el-table-column prop="样本源类型" width="100" label="样本源类型" />
            <el-table-column prop="样本量" width="100" label="样本量" />

            <el-table-column prop="采集医院" width="210" label="所属样本组" />
            <el-table-column fixed="right" prop="入库状态" width="100" label="样本状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.入库状态 === '待入库'" type="success">{{ scope.row.入库状态 }}</el-tag>
                    <el-tag v-if="scope.row.入库状态 !== '待入库'" type="warning">{{ scope.row.入库状态 }}</el-tag>
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
                <el-form v-for="(item, index) of AllDisplayCell" :key="index" label-width="auto" style="max-width: 600px">
                    <el-form-item label="样本编号"> {{ item.样本编号 }} </el-form-item>
                    <el-form-item label="样本源类型"> {{ item.样本源类型 }} </el-form-item>
                    <!-- <el-form-item label="样本量"> {{ item.样本量 }} </el-form-item> -->
                    <!-- <el-form-item label="位置"> {{ item.位置 }} </el-form-item> -->
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
                        <el-date-picker v-model="formDataOut.出库时间" type="date" style="width: 100%" value-format="YYYYMMDD" placeholder="请选择日期" :disabled-date="disabledFn" />
                    </el-form-item>
                    <el-form-item label="研究用途">
                        <el-select v-model="formDataOut.研究用途" placeholder="选择具体研究用途">
                            <el-option label="组织细胞分子等实验验证" value="组织细胞分子等实验验证" />
                            <el-option label="样本组学检测" value="样本组学检测" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="样本组学检测" v-if="formDataOut.研究用途 === '样本组学检测'">
                        <el-select v-model="formDataOut.样本组学检测" placeholder="选择具体内容">
                            <el-option label="全基因组测序" value="全基因组测序" />
                            <el-option label="转录组测序" value="转录组测序" />
                            <el-option label="miRNA测序" value="miRNA测序" />
                            <el-option label="miRNA芯片" value="miRNA芯片" />
                            <el-option label="circRNA测序" value="circRNA测序" />
                            <el-option label="IncRNA测序" value="IncRNA测序" />
                            <el-option label="代谢组学" value="代谢组学" />
                            <el-option label="蛋白组学" value="蛋白组学" />
                            <el-option label="外泌体测序" value="外泌体测序" />
                            <el-option label="全外显子测序" value="全外显子测序" />
                        </el-select>
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
                <el-date-picker v-model="formDataDel.废弃时间" type="date" style="width: 100%" value-format="YYYYMMDD" placeholder="请选择日期" :disabled-date="disabledFn" />
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
    样本组学检测: '',
});
const formDataDel = reactive({
    申请人姓名: '',
    申请人联系方式: '',
    废弃时间: '',
    废弃原因: '',
});
const displayCell = ref([]);
const AllDisplayCell = ref([]);
const disabledFn = (val: any) => {
    return val.getTime() <= new Date().getTime() - 8.64e7;
};
interface FormData {
    位置: number;
    样本编号: string;
    样本源姓名: string;
    样本源类型: string;
    所属样本组: string;
    样本量: string;
    入库时间: string;
}
const multipleSelection = ref<FormData[]>([]);
const handleSelectionChange = (val: FormData[]) => {
    multipleSelection.value = val;
};

const getCell = (data) => {
    AllDisplayCell.value = data;
    if (data.length === 1) {
        if (data[0].样本源类型 !== '暂无') {
            displayCell.value = data[0];
            container.displayItem = true;
        } else {
            container.displayItem = false;
        }
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
    let w = 0;
    if (AllDisplayCell.value.length === 0) {
        ErrorMessage('请选择空闲入库位置！');
    } else {
        AllDisplayCell.value.forEach((obj) => {
            w += Object.keys(obj).length;
        });
        // 判断是否选择 有细胞的位置和无细胞的位置，若都选择了则出现提示
        if (w !== AllDisplayCell.value.length * Object.keys(AllDisplayCell.value[0]).length || Object.keys(AllDisplayCell.value[0]).length !== 2) {
            ErrorMessage('选择的位置中已存在入库细胞！');
        } else {
            CellAddAPI().then((res) => {
                addCellList.value = res.data.result;
                console.log(addCellList.value);
            });
            dialogVisibleAdd.value = true;
        }
    }
};
const Add = () => {
    var Error = false;
    if (AllDisplayCell.value.length !== multipleSelection.value.length) {
        ErrorMessage('所选空位与所选细胞数量不符！');
        Error = true;
    }
    for (const item of multipleSelection.value) {
        if (item.入库状态 === '审核中') {
            ErrorMessage('编号:' + item.样本编号 + '该样本已在入库审核！');
            Error = true;
        }
    }
    if (!Error) {
        const formData = new FormData();
        multipleSelection.value.forEach((value, index) => {
            formData.append(value.样本编号, container.breadcrumbCell + '/' + AllDisplayCell.value[index].POS);
        });
        formData.append('name', userStore.userInfo);
        CellStorageAPI(formData).then((res) => {
            SuccessMessage('入库样本进入审批');
        });
        dialogVisibleAdd.value = false;
    }
};
// 细胞出库
const dialogOut = () => {
    let w = 0;
    if (AllDisplayCell.value.length === 0) {
        ErrorMessage('请选择单个或者复数个需要出库的细胞！');
    } else {
        AllDisplayCell.value.forEach((obj) => {
            w += Object.keys(obj).length;
        });
        // 判断是否选择 有细胞的位置和无细胞的位置，若都选择了则出现提示
        if (w !== AllDisplayCell.value.length * Object.keys(AllDisplayCell.value[0]).length || Object.keys(AllDisplayCell.value[0]).length === 2) {
            ErrorMessage('选择的位置中有空位！');
        } else {
            dialogVisibleOut.value = true;
        }
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
        AllDisplayCell.value.forEach((value) => {
            formData.append(value.样本编号, container.breadcrumbCell + '/' + value.POS);
        });
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
    let w = 0;
    AllDisplayCell.value.forEach((obj) => {
        w += Object.keys(obj).length;
    });
    // 判断是否选择 有细胞的位置和无细胞的位置，若都选择了则出现提示
    if (w !== AllDisplayCell.value.length * Object.keys(AllDisplayCell.value[0]).length || Object.keys(AllDisplayCell.value[0]).length === 2) {
        ErrorMessage('请选择单个或者复数个需要废弃的细胞！');
    } else {
        dialogVisibleDel.value = true;
    }
};
const Del = () => {
    if (formDataDel.申请人姓名 === '' || formDataDel.申请人联系方式 === '' || formDataDel.废弃时间 === '' || formDataDel.废弃原因 == '') {
        ErrorMessage('内容不能为空！');
    } else {
        const formData = new FormData();
        Object.keys(formDataDel).forEach((key) => {
            formData.append(key, formDataDel[key]);
        });
        AllDisplayCell.value.forEach((value) => {
            formData.append(value.样本编号, container.breadcrumbCell + '/' + value.POS);
        });
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
