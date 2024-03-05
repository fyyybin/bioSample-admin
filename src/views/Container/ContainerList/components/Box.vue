<template>
    <div style="display: flex">
        <div class="line_num">
            <div class="first_item"><p>&nbsp;</p></div>
            <div v-for="(item, index) in num1" :key="index" class="line_item">
                <p>{{ item }}</p>
            </div>
        </div>
        <div class="container">
            <div v-for="(item, index) in num2" :key="index" class="cell_item">
                <p>{{ item }}</p>
            </div>
            <div v-for="index of 81" :key="index" class="cell_item2">
                <el-popover placement="bottom" :width="200" trigger="hover" :show-arrow="false">
                    <template #reference>
                        <img :src="images[searchCellBox(props.msg, index).sampleType]" @click="boxDetail(index)" />
                    </template>
                    <p>
                        <span>
                            <p>样本复份编号:{{ searchCellBox(props.msg, index).样本复份编号 }}</p>
                        </span>
                        <span>
                            <p>样本源编号:{{ searchCellBox(props.msg, index).样本源编号 }}</p>
                        </span>
                        <span>
                            <p>样本源姓名:{{ searchCellBox(props.msg, index).样本源姓名 }}</p>
                        </span>
                        <span>
                            <p>样本类型名称:{{ searchCellBox(props.msg, index).sampleType }}</p>
                        </span>
                    </p>
                </el-popover>
            </div>
        </div>
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
                            <p style="padding: 0 2px">样本类型:{{ displayCell.sampleType }}</p>
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
    <el-dialog v-model="dialogVisibleAdd" title="样本添加" width="500">
        <el-form :model="form" label-width="auto" style="max-width: 600px">
            <el-form-item label="位置">
                <el-input v-model="form.position" size="small" style="width: 240px" placeholder="1A" />
            </el-form-item>
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
                <el-select v-model="form.sampleType" size="small" style="width: 240px" placeholder="选择类型">
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
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleAdd = false">Cancel</el-button>
                <el-button type="primary" @click="Add()"> Confirm </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisibleTrans" title="样本删除" width="800">
        <el-table :data="props.msg" style="width: 100%; height: 400px" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="position" label="位置" width="60" />
            <el-table-column prop="样本复份编号" label="样本复份编号" />
            <el-table-column prop="样本源编号" label="样本源编号" />
            <el-table-column prop="样本源姓名" label="样本源姓名" />
            <el-table-column prop="sampleType" label="样本类型" />
            <el-table-column prop="所属样本组" label="所属样本组" />
            <el-table-column prop="样本量" label="样本量" />
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleDel = false">取消</el-button>
                <el-button type="primary" @click="Trans()"> 确认删除 </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Cell from '@/assets/images/container/cell.png';
import Blood from '@/assets/images/container/blood.png';
import Danzhi from '@/assets/images/container/danzhi.png';
import DNA from '@/assets/images/container/dna.png';
import RNA from '@/assets/images/container/rna.png';
import FMW from '@/assets/images/container/fenmiwu.png';

import { useContainerStore } from '@/store';
const container = useContainerStore();
const props = defineProps({
    msg: Array,
    name: String,
    level: Number,
});
const dialogVisibleAdd = ref(false);
const dialogVisibleDel = ref(false);
const num1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const num2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const images = {
    细胞: Cell,
    全血: Blood,
    胆汁: Danzhi,
    DNA: DNA,
    RNA: RNA,
    分泌物: FMW,
    暂无: '',
};

const form = reactive({
    position: '',
    样本复份编号: '',
    样本源编号: '',
    样本源姓名: '',
    sampleType: '',
    所属样本组: '',
    样本量: '',
});

const displayCell = ref([]);
const searchCellBox = (data, i) => {
    // this.cellDetail = {};
    for (const item of data) {
        if (item.position === i) {
            // this.cellDetail = item;
            return item;
        }
    }
    return {
        sampleType: '暂无',
    };
};
const boxDetail = (index) => {
    displayCell.value = searchCellBox(props.msg, index);
    container.displayItem = true;
};
const Add = () => {
    const pos = (Number(form.position[0]) - 1) * 9 + num1.indexOf(form.position[1]) * 9;
    const now = new Date();
    const formData = {
        position: pos,
        样本复份编号: form.样本复份编号,
        样本源编号: form.样本源编号,
        样本源姓名: form.样本源姓名,
        sampleType: form.sampleType,
        所属样本组: form.所属样本组,
        样本量: form.样本量,
        入库时间: now.getFullYear() + ('0' + (now.getMonth() + 1)).slice(-2) + ('0' + now.getDate()).slice(-2),
    };
    console.log(formData);
};

interface FormData {
    position: number;
    样本复份编号: string;
    样本源编号: string;
    样本源姓名: string;
    sampleType: string;
    所属样本组: string;
    样本量: string;
    入库时间: string;
}
const multipleSelection = ref<FormData[]>([]);
const handleSelectionChange = (val: FormData[]) => {
    multipleSelection.value = val;
};

const Trans = () => {
    console.log(multipleSelection.value);
};
</script>

<style scoped>
.line_num {
    width: 50px;
    display: flex;
    flex-wrap: wrap;
    .first_item {
        width: 50px;
        height: 50px;
        border-right: 1px solid #ffffff;
        border-bottom: 1px solid #ffffff;
        text-align: center;
    }
    .line_item {
        width: 50px;
        height: 50px;
        text-align: center;
        border-right: 1px solid #000000;
        border-bottom: 1px solid #ffffff;
    }
}
.container {
    width: 460px;
    height: 460px;

    display: flex;
    flex-wrap: wrap;
    align-content: start;

    .cell_item {
        width: 50px;
        height: 50px;
        text-align: center;
        border-right: 1px solid #ffffff;
        border-bottom: 1px solid #000000;
    }
    .cell_item2 {
        width: 50px;
        height: 50px;
        display: flex;
        border-right: 1px solid #000000;
        border-bottom: 1px solid #000000;
        text-align: center;
        justify-content: center;
        align-items: center;
        .img {
            width: 50px;
            height: 50px;
        }
    }
}
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
