<template>
    <div class="content">
        <span style="color: red; font-size: small; margin-bottom: 5px">* 当前列表显示所有状态下的样本信息</span>

        <el-table
            :data="pageData.datalist"
            border
            v-loading="loading"
            element-loading-text="数据正在加载中..."
            :element-loading-svg="svg"
            style="width: 100%; margin-top: 5px; font-size: 12px"
            height="600"
        >
            <el-table-column v-for="(item, index) in col_headers" :key="index" :prop="item.prop" :label="item.label" :width="item.width"> </el-table-column>
            <el-table-column label="采集状态" width="95px">
                <template #default="scope">
                    <el-tag :type="typeColor(scope.row.采集状态)" @click="infos = openInfo(scope, 'dialog')">{{ scope.row['采集状态'] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="运输状态" width="95px">
                <template #default="scope">
                    <el-tag :type="typeColor(scope.row.运输状态)" @click="infos = openInfo(scope, 'dialog')">{{ scope.row['运输状态'] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="接收状态" width="95px">
                <template #default="scope">
                    <el-tag :type="typeColor(scope.row.接收状态)" @click="infos = openInfo(scope, 'dialog')">{{ scope.row['接收状态'] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button
                        class="btn"
                        @click="
                            infos = openInfo(scope, 'detail');
                            showDetail();
                        "
                        ><p color="green">查看样本</p></el-button
                    >
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 50, 100, 200]"
            :disabled="disabled"
            :background="background"
            :total="collectList.length"
            layout="slot, sizes, ->, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        >
            <template #default>
                <span>
                    共 {{ collectList.length }} 条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前显示第 {{ pageSize * currentPage > collectList.length ? collectList.length : pageSize * currentPage }} 条记录
                    &nbsp;&nbsp;</span
                >
            </template>
        </el-pagination>

        <!--采集按钮对话框-->
        <el-dialog v-model="col_dialog" width="500" :close-on-click-modal="false" :destroy-on-close="true" style="font-size: 18px">
            <template #title>
                采集信息<el-tag type="primary" style="font-size: 13px; margin-left: 10px">{{ infos['样本源编号'] }}</el-tag>
            </template>
            <div class="info">
                <span class="sample-key">采集时间：</span>
                <el-date-picker v-model="col_date" type="date" style="width: 220px" value-format="YYYYMMDD" placeholder="请选择日期" :disabled-date="disabledFn" />
            </div>
            <div class="info">
                <span class="sample-key">采集医院：</span>
                <span class="sample-value">{{ infos['采集医院'] }}</span>
            </div>
            <div class="info">
                <span class="sample-key">样本类型：</span>
                <span class="sample-value">{{ infos['样本类型'] }}</span>
            </div>
            <div class="info">
                <span class="sample-key">预处理：</span>
                <span class="sample-value">{{ infos['预处理'] }}</span>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="colSubmit(infos, col_date)">完成</el-button>
                </div>
            </template>
        </el-dialog>

        <!--运输按钮对话框-->
        <el-dialog v-model="tran_dialog" width="500" :close-on-click-modal="false" :destroy-on-close="true" style="font-size: 18px">
            <template #title>
                运输信息<el-tag type="primary" style="font-size: 13px; margin-left: 10px">{{ infos['样本源编号'] }}</el-tag>
            </template>
            <div class="info">
                <span class="sample-key">运输方：</span>
                <el-input class="sample-value" v-model="tran_name" placeholder="请输入公司名称" clearable></el-input>
            </div>
            <div class="info">
                <span class="sample-key">负责人：</span>
                <el-input class="sample-value" v-model="tran_staff" placeholder="请输入负责人姓名" clearable></el-input>
            </div>
            <div class="info">
                <span class="sample-key">联系方式：</span>
                <el-input class="sample-value" v-model="tran_phone" placeholder="请输入负责人联系方式" clearable></el-input>
            </div>
            <div class="info">
                <span class="sample-key">运出时间：</span>
                <el-date-picker v-model="tran_date" type="date" style="width: 220px" value-format="YYYYMMDD" placeholder="请选择日期" :disabled-date="disabledFn" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="tranSubmit(infos, tran_name, tran_staff, tran_phone, tran_date)">发布</el-button>
                </div>
            </template>
        </el-dialog>

        <!--接收按钮对话框-->
        <el-dialog v-model="acc_dialog" width="500" :close-on-click-modal="false" :destroy-on-close="true" style="font-size: 18px">
            <template #title>
                接收信息<el-tag type="primary" style="font-size: 13px; margin-left: 10px">{{ infos['样本源编号'] }}</el-tag>
            </template>
            <div class="info">
                <span class="sample-key">接收人：</span>
                <el-input class="sample-value" v-model="acc_staff" placeholder="请输入负责人姓名" clearable></el-input>
            </div>
            <div class="info">
                <span class="sample-key">联系方式：</span>
                <el-input class="sample-value" v-model="acc_phone" placeholder="请输入负责人联系方式" clearable></el-input>
            </div>
            <div class="info">
                <span class="sample-key">接受时间：</span>
                <el-date-picker v-model="acc_date" type="date" style="width: 220px" value-format="YYYYMMDD" placeholder="请选择日期" :disabled-date="disabledFn" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="accSubmit(infos, acc_staff, acc_phone, acc_date)">接收</el-button>
                </div>
            </template>
        </el-dialog>

        <el-dialog v-model="info_dialog" width="60%" title="详细信息" draggable :close-on-click-modal="false" :destroy-on-close="true">
            <infoDetail :params="id" :content="content" :hospital="hospital"></infoDetail>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { col_headers } from '../variable';
import { ElMessage } from 'element-plus';
import infoDetail from './component/info_dialog.vue';
import { collectionSearch, collectionCom, collectionTrans, collectionAcc } from '@/http/api';
const collectList = ref([]);
const loading = ref(true);

const info_dialog = ref(false);
const col_dialog = ref(false); // 采集按钮对话框
const tran_dialog = ref(false); // 运输按钮对话框
const acc_dialog = ref(false); // 接收按钮对话框

const col_date = ref(false);
// 运输信息
const tran_name = ref('');
const tran_staff = ref('');
const tran_phone = ref('');
const tran_date = ref('');
// 接收信息
const acc_staff = ref('');
const acc_phone = ref('');
const acc_date = ref('');
const typeColor = (item) => {
    if (item == '已完成') return 'primary';
    else if (item == '未知') return 'danger';
    else return 'warning';
};

const id = ref('');
const content = ref('');
const hospital = ref('');
// 详细数据
const showDetail = () => {
    const sample = infos.value;
    (id.value = sample['样本源编号']), (content.value = sample['样本类型']), (hospital.value = sample['采集医院']);
    info_dialog.value = true;
    /*router.push({
        name: 'detail',
        query: {
            id: sample["样本源编号"],
            content: sample["样本类型"],
            hospital: sample["采集医院"]
        }
    });*/
};

// 所有采集需求
const getData = () => {
    collectionSearch().then((response) => {
        let result = response.data;
        collectList.value = result.data;
        loading.value = false;
    });
};
// 采集按钮
const colSubmit = (item, date) => {
    let params = {
        样本源编号: item['样本源编号'],
        样本类型: item['样本类型'],
        采集医院: item['采集医院'],
        采集时间: date,
    };
    collectionCom(params).then((response) => {
        // console.log(JSON.stringify(response.data));
        col_dialog.value = false;
        mess(1);
        getData();
    });
};
// 运输按钮
const tranSubmit = (item, name, staff, phone, date) => {
    if (name == '' || phone == '' || staff == '' || date == '') {
        tips();
    } else {
        let params = {
            样本源编号: item['样本源编号'],
            样本类型: item['样本类型'],
            采集医院: item['采集医院'],
            运输方: name,
            负责人: staff,
            负责人联系方式: phone,
            运出时间: date,
        };
        collectionTrans(params).then((response) => {
            // console.log(JSON.stringify(response.data));
            tran_dialog.value = false;
            mess(2);
            getData();
        });
    }
};
// 接收按钮
const accSubmit = (item, staff, phone, date) => {
    if (phone == '' || staff == '' || date == '') {
        tips();
    } else {
        let params = {
            样本源编号: item['样本源编号'],
            样本类型: item['样本类型'],
            采集医院: item['采集医院'],
            接收人: staff,
            接收人联系方式: phone,
            接收时间: date,
        };
        collectionAcc(params).then((response) => {
            // console.log(JSON.stringify(response.data));
            acc_dialog.value = false;
            mess(3);
            getData();
        });
    }
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
        return collectList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
    }),
});

const infos = ref();
const openInfo = (item, type) => {
    if (type == 'dialog') {
        if (item.row['采集状态'] == '未知' && item.row['运输状态'] == '未知' && item.row['接收状态'] == '未知') col_dialog.value = true;
        else if (item.row['采集状态'] == '已完成' && item.row['运输状态'] == '未知') tran_dialog.value = true;
        else if (item.row['采集状态'] == '已完成' && item.row['运输状态'] == '运输中' && item.row['接收状态'] == '未接收') acc_dialog.value = true;
    }
    return item.row;
};
const disabledFn = (val: any) => {
    return val.getTime() <= new Date().getTime() - 8.64e7;
};
onMounted(() => {
    getData();
});

const mes = ref('');
const mess = (item) => {
    switch (item) {
        case 1:
            mes.value = '样本采集已完成!';
            break;
        case 2:
            mes.value = '运输任务已发布！';
            break;
        case 3:
            mes.value = '样本接受成功！';
            break;
        default:
            break;
    }
    ElMessage({
        message: mes.value,
        type: 'success',
    });
};
const tips = () => {
    ElMessage({
        message: '表单不能为空！',
        type: 'warning',
    });
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
        font-weight: bold;
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
    width: 15px;
    height: 100%;
    display: flex;
}
</style>
