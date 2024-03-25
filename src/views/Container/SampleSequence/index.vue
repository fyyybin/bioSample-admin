<template>
    <div class="content">
        <el-table
            :data="pageData.datalist"
            border
            v-loading="loading"
            element-loading-text="数据正在加载中..."
            :element-loading-svg="svg"
            style="width: 100%; margin-top: 5px; font-size: 12px"
            height="600"
        >
            <el-table-column v-for="(item, index) in headers" :key="index" :prop="item.prop" :label="item.label" :width="item.width"> </el-table-column>
            <el-table-column label="测序状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.测序状态 == '已送样'" type="danger" @click="infos = openInfo(scope, 'dialog')">{{ scope.row['测序状态'] }}</el-tag>
                    <el-tag
                        v-if="scope.row.测序状态 == '测序中'"
                        type="warning"
                        @click="
                            noticeDialog = true;
                            selectSample = scope.row['样本编号'];
                        "
                        >{{ scope.row['测序状态'] }}</el-tag
                    >
                    <el-tag v-if="scope.row.测序状态 == '已完成'" type="success">{{ scope.row['测序状态'] }}</el-tag>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 50, 100, 200]"
            :disabled="disabled"
            :background="background"
            :total="sequenceDatas.length"
            layout="slot, sizes, ->, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
            <template #default>
                <span>
                    共 {{ sequenceDatas.length }} 条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前显示第
                    {{ pageSize * currentPage > sequenceDatas.length ? sequenceDatas.length : pageSize * currentPage }} 条记录 &nbsp;&nbsp;</span
                >
            </template>
        </el-pagination>

        <!--测序按钮对话框-->
        <el-dialog v-model="sequenceDialog" width="500">
            <template #header>
                测序信息<el-tag type="success" style="font-size: 13px; margin-left: 10px">{{ infos['样本编号'] }}</el-tag>
            </template>
            <el-form :model="cellSeq" label-width="auto" style="max-width: 600px">
                <el-form-item style="padding: 0 2px" label="测序公司">
                    <el-input v-model="cellSeq.测序公司" />
                </el-form-item>
                <el-form-item label="测序平台">
                    <el-input v-model="cellSeq.测序平台" />
                </el-form-item>
                <el-form-item label="测序数据">
                    <el-select v-model="cellSeq.测序数据" placeholder="是否有测序数据">
                        <el-option v-for="(item, index) in pred" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="sequenceDialog = false">取消</el-button>
                    <el-button type="primary" @click="putData()"> 确认 </el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="noticeDialog" width="300" title="提示">
            <span>该样本确定完成测序吗</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="noticeDialog = false">取消</el-button>
                    <el-button type="primary" @click="change()">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { sequenceList, putSeqAPI, changeSeqAPI } from '@/http/api';
import { headers, pred } from './variable';
import { useUserStore } from '@/store';
import { ElMessage } from 'element-plus';

const sequenceDatas = ref([]);
const loading = ref(false);
const sequenceDialog = ref(false);
const noticeDialog = ref(false);
const UserStore = useUserStore();
const selectSample = ref('');
const cellSeq = reactive({
    测序公司: '',
    测序平台: '',
    测序数据: '',
});
// 所有采集需求
const getData = () => {
    const formData = new FormData();
    formData.append('username', UserStore.userInfo);
    sequenceList(formData).then((response) => {
        sequenceDatas.value = response.data.result;
        loading.value = false;
    });
};

onMounted(() => {
    getData();
});

const infos = ref();
const openInfo = (item, type) => {
    selectSample.value = item.row.样本编号;
    if (type == 'dialog') sequenceDialog.value = true;
    return item.row;
};
const background = ref(false);
const disabled = ref(false);
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        />
      `;
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
    pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
};
const pageData = reactive({
    datalist: computed(() => {
        return sequenceDatas.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
    }),
});
const SuccessMessage = (message) => {
    ElMessage({
        message: message,
        type: 'success',
    });
};
const putData = () => {
    const formData = new FormData();
    formData.append('测序公司', cellSeq.测序公司);
    formData.append('测序平台', cellSeq.测序平台);
    formData.append('测序数据', cellSeq.测序数据);
    formData.append('样本编号', selectSample.value);
    formData.append('username', UserStore.userInfo);

    putSeqAPI(formData).then((res) => {
        SuccessMessage('已进入测序中');
        sequenceDialog.value = false;
        getData();
    });
};
const change = () => {
    const formData = new FormData();
    formData.append('样本编号', selectSample.value);
    formData.append('username', UserStore.userInfo);
    changeSeqAPI(formData).then((res) => {
        SuccessMessage('测序状态修改完成');
        noticeDialog.value = false;
        getData();
    });
};
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    border-radius: 6px;
    box-shadow: 0 0 12px rgb(0 0 0 / 5%);
    .input {
        font-size: 13px;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0px 15px 15px 15px;
    }
}
.info {
    font-size: 17px;
    color: #000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0px 0px 20px 0px;
    .sample-key {
        padding-right: 15px;
        width: 100px;
        text-align: end;
        color: #000;
        font-size: 15px;
        display: flex;
    }
    .sample-value {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 220px;
        height: 30px;
        font-size: 16px;
    }
}
.textbox {
    width: 200px;
    height: 30px;
    font-size: 13px;
}
.btn {
    width: 111px;
    height: 30px;
    font-size: 13px;
    font-weight: bold;
    /* background: #318ccb; */
    border: 1px solid #009688;
    color: #000 !important;
    border-radius: 3px;
    box-sizing: border-box;
}

.el-pagination {
    font-size: 12px;
    margin: 10px 0px 0px 8px;
}
.table-btn {
    width: 75px;
    height: 30px;
    font-size: 13px;
    font-weight: bold;
    /* background: #318ccb; */
    border: 1px solid #009688;
    border-radius: 3px;
    box-sizing: border-box;
}
</style>
