<template>
    <div>
        <div class="content">
            <span style="color: red; font-size: small; margin-bottom: 5px">* 当前列表所有患者已签订同意书</span>
            <el-table
                :data="pageData.datalist"
                border
                v-loading="loading"
                element-loading-text="数据正在加载中..."
                :element-loading-svg="svg"
                style="width: 100%; margin-top: 5px; font-size: 12px"
                height="600"
            >
                <el-table-column v-for="(item, index) in tableheaders" :key="index" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
                <el-table-column label="知情同意" width="90px">
                    <template #default="scope">
                        <el-tag v-if="scope.row['知情同意'] == '是'" type="success">{{ scope.row['知情同意'] }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280px">
                    <template #default="scope">
                        <div class="input">
                            <el-button class="btn" :icon="CirclePlus" @click="infos = openInfo(scope, 'new')">创建采集</el-button>
                            <el-button
                                class="btn"
                                :icon="Switch"
                                @click="
                                    infos = openInfo(scope, 'all');
                                    showDetail();
                                "
                                >所有样本</el-button
                            >
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                :disabled="disabled"
                :background="background"
                layout="slot, sizes, ->, prev, pager, next, jumper"
                :total="fromList.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            >
                <template #default>
                    <span>
                        共 {{ fromList.length }} 条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前显示第 {{ pageSize * currentPage > fromList.length ? fromList.length : pageSize * currentPage }} 条记录
                        &nbsp;&nbsp;</span
                    >
                </template>
            </el-pagination>

            <el-dialog v-model="dialogVisible" width="500" :close-on-click-modal="false" @close="clearData">
                <template #header>
                    采集信息<el-tag type="success" style="margin-left: 10px">{{ infos['样本源编号'] }}</el-tag>
                </template>
                <div class="info">
                    <span class="sample-key">创建时间</span>
                    <el-date-picker v-model="sample_date" type="date" style="width: 300px" value-format="YYYYMMDD" placeholder="请选择日期" :disabled-date="disabledFn" />
                </div>
                <div class="info">
                    <span class="sample-key">研究用途</span>
                    <el-tree-select v-model="sample_use" :data="sampleUse" class="sample-value" placeholder="请选择样本用途"/>
                </div>
                <div class="info" v-if="sample_use=='其他'">
                    <el-input class="sample-value" v-model="use_et" style="margin-left: 25%;" placeholder="请输入其他用途"></el-input>
                </div>
                <div class="info">
                    <span class="sample-key">样本量(ul)</span>
                    <div  class="sample-value" style="display: flex;">
                        <el-input class="sample-value" v-model="sample_valume1" placeholder="样本量" style="width: 300px;"></el-input>

                        <el-select v-model="sample_unit1" style="margin-left: 10px;" class="sample-value" placeholder="单位">
                            <el-option v-for="(item, index) in sampleUnit1" :key="index" :label="item" :value="item"></el-option>
                        </el-select>

                        <el-input class="sample-value"  v-model="sample_valume2" placeholder="样本量" style="width: 300px; margin-left: 10px;"></el-input>
                        
                        <el-select v-model="sample_unit2" style="margin-left: 10px;" class="sample-value" placeholder="单位">
                            <el-option v-for="(item, index) in sampleUnit2" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="info">
                    <span class="sample-key">预处理</span>
                    <el-select v-model="sample_pred" class="sample-value" placeholder="是否经过预处理">
                        <el-option v-for="(item, index) in pred" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button type="primary"
                            @click="submitData(sample_date,sample_use,use_et,sample_valume1,sample_unit1,sample_valume2,sample_unit2, sample_pred)"> 确定 </el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
        <el-dialog v-model="infoDialog" width="60%" draggable :close-on-click-modal="false" :destroy-on-close="true">
            <template #header>所有样本</template>
            <fromInfo :params="id"></fromInfo>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue';
import { CirclePlus, Switch } from '@element-plus/icons-vue';
import { tableheaders, pred, sampleUse,sampleUnit1,sampleUnit2 } from '../variable';
import { ElMessage } from 'element-plus';
import fromInfo from './fromInfo.vue';
import { sampleFromAgreeSearch, collectionAdd } from '@/http/api';
// 表单信息
const sample_date = ref('');
const sample_valume1 = ref('');
const sample_valume2 = ref('');
const sample_unit1 = ref('')
const sample_unit2 = ref('')
const sample_pred = ref('');
const sample_use = ref('')
const use_et = ref('')

const loading = ref(true);
const fromList = ref([]);
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
const dialogVisible = ref(false);
const infoDialog = ref(false);
const infos = ref();
const openInfo = (item, type) => {
    if (type == 'new') dialogVisible.value = true;
    else infoDialog.value = true;
    return item.row;
};
// 样本源列表
const getData = () => {
    sampleFromAgreeSearch().then((response) => {
        let result = response.data;
        fromList.value = result.data;
        dialogVisible.value = false;
        loading.value = false;
    });
};

// 所有样本
const id = ref('');
const showDetail = () => {
    const sample = infos.value;
    id.value = sample['样本源编号'];
    infoDialog.value = true;
};
const submitData = (date,use,et,valume1,unit1,valume2,unit2,pred) => {
    if (date == '' || use == '' || valume1=='' || unit1=='' || valume2=='' || unit2=='' || pred == '') {
        tips(1);
    } else {
        infos.value['采集时间'] = date;
        infos.value['研究用途'] = use;
        infos.value['其他'] = et;
        infos.value['体积'] = valume1;
        infos.value['体积单位'] = unit1;
        infos.value['数量'] = valume2;
        infos.value['数量单位'] = unit2;
        infos.value['预处理'] = pred;

        const formData = new FormData();
        Object.keys(infos.value).forEach((key) => {
            formData.append(key, infos.value[key]);
        });
        collectionAdd(formData).then(() => {
            // console.log(JSON.stringify(response.data));
            dialogVisible.value = false;
            tips(2);
            loading.value = true;
            getData();
        });
    }
};

const background = ref(false);
const disabled = ref(false);
// 设置默认时间
const disabledFn = (val: any) => {
    return val.getTime() <= new Date().getTime() - 8.64e7;
};
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
    // console.log(`${val} items per page`);
    pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
    // console.log(`current page: ${val}`);
    currentPage.value = val;
};
const pageData = reactive({
    datalist: computed(() => {
        return fromList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
    }),
});
onMounted(() => {
    getData();
});
const clearData = () => {
    sample_date.value = '';
    sample_use.value = '';
    use_et.value = '';
    sample_valume1.value = '';
    sample_valume2.value = '';
    sample_unit1.value = '';
    sample_unit2.value = '';
    sample_pred.value = '';
};
const tips = (item) => {
    switch (item) {
        case 1:
            ElMessage({
                message: '表单不能为空！',
                type: 'warning',
            });
            break;
        case 2:
            ElMessage({
                message: '采集任务已发布',
                type: 'success',
            });
            break;
        default:
            break;
    }
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
        font-size: 15px;
        display: flex;
        flex-direction: row;
        margin: 0px 5px 5px 0px;
    }
}
.info {
    font-size: 17px;
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
        width: 300px;
        height: 30px;
        font-size: 13px;
    }
}
.textbox {
    width: 200px;
    height: 30px;
    font-size: 13px;
}
.btn {
    width: 120px;
    height: 30px;
    font-size: 13px;
    font-weight: bold;
    /* background: #318ccb; */
    border: 1px solid #009688;
    border-radius: 3px;
    box-sizing: border-box;
}
.el-pagination {
    font-size: 12px;
    margin: 10px 0px 0px 8px;
}
.table-btn {
    width: 15px;
    height: 15px;
    margin: 0px 4px 0px 4px;
}
</style>
