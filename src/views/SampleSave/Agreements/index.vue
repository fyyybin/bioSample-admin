<template>
    <div class="content">
        <span style="color: red; font-size: small; margin-bottom: 5px;">* 当前列表所有患者已签订同意书</span>
        <el-table :data="pageData.datalist" border v-loading="loading" element-loading-text = "数据正在加载中..."
            :element-loading-svg="svg" style="width: 100%; margin-top: 5px; font-size: 12px;">
            <el-table-column v-for="item in tableheaders" :prop="item.prop" :label="item.label"
                :width="item.width"></el-table-column>
            <el-table-column label="知情同意" width="90px">
                <template #default="scope">
                    <el-tag :type=tagColor(scope.row.知情同意)>{{ scope.row["知情同意"] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="280px">
                <template  #default="scope">
                    <div class="input">
                        <el-button class="btn" :icon="CirclePlus" @click="infos=openInfo(scope,'new')">创建采集</el-button>
                        <el-button class="btn" :icon="Switch" @click="infos=openInfo(scope,'all');showDetail()">所有样本</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 50, 100, 200]"
            :disabled="disabled" :background="background" layout="slot, sizes, ->, prev, pager, next, jumper"
            :total="fromList.length" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            <template #default>
                <span> 共 {{ fromList.length }} 条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前显示第 {{ pageSize*currentPage>fromList.length?fromList.length:pageSize*currentPage }} 条记录 &nbsp;&nbsp;</span>
            </template>
        </el-pagination>

        <el-dialog v-model="dialogVisible"  
            width="500"
            :close-on-click-modal="false"
            @close="clearData"
            style="font-size: 18px; ">
            <template #title>
                采集信息<el-tag type="primary" style="font-size: 13px; margin-left: 10px;">{{ infos["样本源编号"] }}</el-tag>
            </template>
            <div class="info">
                <span class="sample-key">创建时间：</span>
                <el-date-picker
                        v-model="sample_date"
                        type="date"
                        style="width: 250px;"
                        value-format="YYYYMMDD"
                        placeholder="请选择日期"
                        :disabled-date="disabledFn"
                    />
            </div>
            <div class="info">
                <span class="sample-key">样本类型：</span>
                <el-select v-model="sample_content" class="sample-value" placeholder="请选择类型">
                    <el-option v-for="item in content" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <div class="info">
                <span class="sample-key">样本量(ul)：</span>
                <el-input class="sample-value" v-model="sample_valume" placeholder="请输入样本量"></el-input>
            </div>
            <div class="info">
                <span class="sample-key">预处理：</span>
                <el-select v-model="sample_pred" class="sample-value" placeholder="是否经过预处理">
                    <el-option v-for="item in pred" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitData(sample_date,sample_valume,sample_content,sample_pred)">
                    确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <el-dialog v-model="infoDialog" width="60%" title="所有样本" draggable :close-on-click-modal=false :destroy-on-close=true>
        <fromInfo :params=id></fromInfo>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue'
import { CirclePlus, Switch } from '@element-plus/icons-vue'
import { tableheaders, content, pred } from '../variable'
import axios from 'axios';
import { ElMessage } from 'element-plus'
import fromInfo from './fromInfo.vue'

// 表单信息
const sample_date = ref('')
const sample_valume = ref('')
const sample_content = ref('')
const sample_pred = ref('')

const loading = ref(true)
const fromList = ref([])
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        />
      `
const dialogVisible = ref(false)   
const infoDialog = ref(false)   
const infos = ref()
const openInfo = (item,type) => {
    if(type=='new')
        dialogVisible.value = true;
    else
        infoDialog.value = true;
    return item.row
}
// 样本源列表
const getData = () => {
    var config = {
        method: 'get',
        url: 'http://127.0.0.1:5002/samplefrom/agree/',
        headers: { 
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
        }
    };
    axios(config)
        .then(function (response) {
            let result = response.data;
            fromList.value = result.data;
            dialogVisible.value = false
            loading.value = false
        })
        .catch(function (error) {
            console.log(error);
            loading.value = false;
        });
}
// 所有样本
const id = ref('')
const showDetail = () => {
    const sample = infos.value
    id.value = sample["样本源编号"]
    infoDialog.value = true;
}
const submitData = (date, valume, content, pred) => {
    if(date=='' || valume=='' || content=="" || pred==""){
        tips(1)
    }
    else{
        infos.value["样本创建时间"] = date;
        infos.value["样本类型"] = content;
        infos.value["样本量"] = valume;
        infos.value["预处理"] = pred;
        let params = infos.value
        var config = {
            method: 'post',
            url: 'http://127.0.0.1:5002/collection/add/',
            headers: { 
                'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
                'Content-Type': 'application/json'
            },
            data : params
            };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                dialogVisible.value = false;
                tips(2)
                loading.value = true
                getData();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

const background = ref(false)
const disabled = ref(false)
// 设置默认时间
const disabledFn = (val:any) =>{
    return val.getTime() <= new Date().getTime() - 8.64e7;
};
const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
    pageSize.value = val
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    currentPage.value = val
}
const pageData = reactive({
    datalist: computed(()=>{
        return fromList.value.slice(
            ( currentPage.value - 1 ) * pageSize.value,
            currentPage.value * pageSize.value
        );
    }),
})
onMounted(() => {
    getData()
})
const clearData = () => {
    sample_date.value = ''
    sample_content.value = ''
    sample_valume.value = ''
    sample_pred.value = ''
}
const tips = item => {
    switch(item){
        case 1:
            ElMessage({
                message: '表单不能为空！',
                type: 'warning'
            })
            break;
        case 2:
            ElMessage({
                message: '采集任务已发布',
                type: 'success'
            })
            break;
        default:
            break;
    }
}
const tagColor = item => {
    if(item=='是')
        return 'success'
    else
        return 'warning'
}
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
        margin: 0px 5px 5px 0px
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
        font-weight: bold;
        color: #000;
        font-size: 15px;
        display: flex;
    }
    .sample-value {
        width: 250px;
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
