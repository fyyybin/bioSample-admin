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
                    <el-tag v-if="scope.row.测序状态 == '已送样'" type="danger">{{ scope.row['测序状态'] }}</el-tag>
                    <el-tag v-if="scope.row.测序状态 == '测序中'" type="warning">{{ scope.row['测序状态'] }}</el-tag>
                    <el-tag v-if="scope.row.测序状态 == '已完成'" type="success">{{ scope.row['测序状态'] }}</el-tag>
                    <el-button v-if="scope.row.测序状态 == '-'" plain class="btn"  @click="infos = openInfo(scope, 'dialog')">样本测序</el-button>
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
                    共 {{ sequenceDatas.length }} 条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前显示第 {{ pageSize * currentPage > sequenceDatas.length ? sequenceDatas.length : pageSize * currentPage }} 条记录
                    &nbsp;&nbsp;</span
                >
            </template>
        </el-pagination>

        <!--测序按钮对话框-->
        <el-dialog v-model="sequenceDialog" width="500" :close-on-click-modal="false" @close="clearData" style="font-size: 18px">
            <template #header>
                测序信息<el-tag type="success" style="font-size: 13px; margin-left: 10px">{{ infos['样本编号'] }}</el-tag>
            </template>
            <div class="info">
                <span class="sample-key">测序公司</span>
                <el-input class="sample-value" v-model="firm" placeholder="请输入公司名称" clearable></el-input>
            </div>
            <div class="info">
                <span class="sample-key">测序平台</span>
                <el-input class="sample-value" v-model="platform" placeholder="请输入平台名称" clearable></el-input>
            </div>
            <div class="info">
                    <span class="sample-key">测序数据</span>
                    <el-select v-model="datastatus" class="sample-value" placeholder="是否有测序数据">
                        <el-option v-for="(item, index) in pred" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="">发布</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { sequenceList } from '@/http/api';
import { headers, pred } from './variable'

const sequenceDatas = ref([])
const loading = ref(false)
const sequenceDialog = ref(false)

const firm = ref('')
const platform = ref('')
const datastatus = ref('')

// 所有采集需求
const getData = () => {
    sequenceList().then((response) => {
        let result = response.data;
        sequenceDatas.value = result.data;
        loading.value = false;
    });
};

onMounted(()=>{
    getData()
})

const infos = ref();
const openInfo = (item, type) => {
    if(type=='dialog')
        sequenceDialog.value = true
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
    // console.log(`${val} items per page`);
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
// 关闭对话框后清空
const clearData = () => {
    firm.value = '';
    platform.value = '';
    datastatus.value = '';
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