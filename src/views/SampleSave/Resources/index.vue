<template>
    <div class="content">
        <div class="contentLeft">
            <el-tree :data="sampleType" :props="{ label: 'label' }" @node-click="handleNodeClick">
                <template #default="{ node, data }">
                    <el-icon style="padding: 0 5px 0 0">
                        <component :is="data.icon"></component>
                    </el-icon>
                    <span> {{ node.label }}</span>
                </template>
            </el-tree>
        </div>
        <div class="contentMain">
            <div class="content-main">
                <div style="display: flex; flex-direction: row">
                    <div class="input" style="width: 400px">
                        <el-input placeholder="请输入关键词搜索" clearable></el-input>
                    </div>
                    <div class="input">
                        <el-button plain class="btn" :icon="Search">搜索</el-button>
                        <el-button plain class="btn" :icon="Refresh" @click="getData('')">重置</el-button>
                        <el-button plain class="btn" :icon="CirclePlus" @click="dialogVisible = true">创建样本源</el-button>
                    </div>
                </div>
                <span style="color: red; font-size: small; margin-bottom: 5px">* 样本采集需签订知情同意书（样本源默认状态为否）</span>
                <el-table :data="pageData.datalist" border v-loading="loading" element-loading-text="数据正在加载中..." :element-loading-svg="svg" style="width: 100%; font-size: 12px" height="800">
                    <el-table-column v-for="(item, index) in tableheaders" :key="index" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
                    <el-table-column label="知情同意">
                        <template #default="scope">
                            <el-tag :type="tagColor(scope.row.知情同意)">{{ scope.row['知情同意'] }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-tooltip content="编辑样本源" placement="bottom" effect="light">
                                <img src="@/assets/images/bjyb.png" @click="infos = openInfo(scope, 'modify')" class="table-btn" />
                            </el-tooltip>
                            <el-tooltip content="删除样本源" placement="bottom" effect="light">
                                <img src="@/assets/images/delete.png" @click="(infos = openInfo(scope, 'delete')), (noticeDialog = true)" class="table-btn" />
                            </el-tooltip>
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
            </div>
        </div>
        <!--创建样本源-->
        <el-dialog v-model="dialogVisible" title="创建样本源" width="450" align-center :close-on-click-modal="false" @close="clearData">
            <div label-width="auto" style="padding: 0px 15px">
                <div class="input">
                    <span class="required" style="color: red">* </span>样本源姓名：
                    <el-input class="textbox" v-model="new_name"></el-input>
                </div>
                <div class="input">
                    <span class="required" style="color: red">* </span>样本源类型：
                    <el-select v-model="new_from" class="textbox">
                        <el-option v-for="(item, index) in sampleType" :key="index" :label="item.label" :value="item.label"> </el-option>
                    </el-select>
                </div>
                <div class="input">
                    <span class="required" style="color: red">* </span>采集医院：
                    <el-select v-model="new_hospital" class="textbox" style="margin-left: 15px">
                        <el-option v-for="(item, index) in hospital" :key="index" :label="item" :value="item"> </el-option>
                    </el-select>
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="submitData(new_name, new_from, new_hospital)">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <!--修改样本源-->
        <el-dialog v-model="agreeDialog" width="430" align-center :close-on-click-modal="false" :destroy-on-close="true" @close="clearData">
            <template #header>
                知情同意<el-tag type="primary" style="font-size: 13px; margin-left: 10px">{{ infos['样本源编号'] }}</el-tag>
            </template>
            <div label-width="auto" style="padding: 0px 15px">
                <div class="input">
                    <span class="required" style="color: red">* </span>年龄：
                    <el-input class="textbox" v-model="years" style="margin-left: 25px"></el-input>
                </div>
                <div class="input">
                    <span class="required" style="color: red">* </span>性别：
                    <el-select v-model="sex" class="textbox" style="margin-left: 25px">
                        <el-option v-for="(item, index) in sexs" :key="index" :label="item" :value="item"> </el-option>
                    </el-select>
                </div>
                <div class="input">
                    <span class="required" style="color: red">* </span>创建时间：
                    <el-date-picker v-model="date" type="date" style="width: 250px" value-format="YYYYMMDD" placeholder="请选择日期" :disabled-date="disabledFn" />
                </div>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="modifySample(years, sex, date, infos['样本源编号'])">确定</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="noticeDialog" width="300" title="提示">
            <span>确定要删除吗？</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="noticeDialog = false">取消</el-button>
                    <el-button type="primary" @click="delSample(infos['样本源编号'])">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue';
import { Search, CirclePlus, Refresh } from '@element-plus/icons-vue';
// 表格标题
import { tableheaders, sampleType, hospital } from '../variable';
import { ElMessage } from 'element-plus';
import { sampleFromSearch, sampleFromAdd, sampleFromDel, sampleFromAgree } from '@/http/api';
const noticeDialog = ref(false);
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
// 创建新样本
const new_hospital = ref('');
const new_from = ref('');
const new_name = ref('');
const dialogVisible = ref(false);
// 修改样本
const agreeDialog = ref(false);
const sex = ref('');
const years = ref('');
const date = ref('');
// 创建样本源（未同意）
const submitData = (new_name, new_from, new_hospital) => {
    if (new_hospital == '' || new_name == '' || new_from == '') tips('warning', '表格不能为空！');
    else {
        const formData = new FormData();
        formData.append('样本源姓名', new_name);
        formData.append('样本源类型', new_from);
        formData.append('采集医院', new_hospital);
        sampleFromAdd(formData).then((response) => {
            // console.log(JSON.stringify(response.data));
            dialogVisible.value = false;
            tips('success', '样本源注册成功！');
            getData('');
        });
    }
};
// 样本源列表
const getData = (item) => {
    sampleFromSearch(item)
        .then((response) => {
            let result = response.data;
            fromList.value = result.data;
            dialogVisible.value = false;
            loading.value = false;
        })
        .catch((error) => {
            // console.log(error);
            loading.value = false;
        });
};
// 删除样本源
const delSample = (item) => {
    sampleFromDel(item)
        .then((response) => {
            tips('success', '样本源已删除！');
            noticeDialog.value = false;
            loading.value = true;
            getData('');
        })
        .catch((error) => {
            loading.value = false;
        });
};
// 修改样本源
const modifySample = (new_year, new_sex, new_date, id) => {
    if (new_year == '' || new_sex == '' || new_date == '') tips('warning', '表格不能为空！');
    else {
        const formData = new FormData();
        formData.append('样本源编号', id);
        formData.append('年龄', new_year);
        formData.append('性别', new_sex);
        formData.append('创建时间', new_date);
        sampleFromAgree(formData).then((res) => {
            agreeDialog.value = false;
            tips('success', '样本源已修改！');
            getData('');
        });
    }
};
const infos = ref();
const openInfo = (item, type) => {
    if (type == 'delete') noticeDialog.value = true;
    else if (item.row['知情同意'] == '否') agreeDialog.value = true;
    return item.row;
};
const sexs = ['男', '女'];
const disabledFn = (val: any) => {
    return val.getTime() <= new Date().getTime() - 8.64e7;
};
const clearData = () => {
    new_hospital.value = '';
    new_from.value = '';
    new_name.value = '';
    sex.value = '';
    years.value = '';
    date.value = '';
};
// 分页功能
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
const background = ref(false);
const disabled = ref(false);
const flag = ref();
const tips = (ty, mes) => {
    if (ty == 'success') flag.value = 'success';
    else flag.value = 'warning';
    ElMessage({
        message: mes,
        type: ty,
    });
};
const count = ref(false);
const handleNodeClick = (data) => {
    count.value = true;
    loading.value = true;
    getData(data.label);
};
const tagColor = (item) => {
    if (item == '是') return 'success';
    else return 'warning';
};
onMounted(() => {
    if (!count.value) getData('');
});
</script>
<style scoped lang="scss">
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
    :deep(.contentLeft) {
        width: 20%;
        height: 100%;
        border: 1px solid var(--el-border-color-light);
        .el-tree {
            padding: 10px;
        }
    }
    .contentMain {
        width: 80%;
        height: 100%;
        border-right: 1px solid var(--el-border-color-light);
        border-top: 1px solid var(--el-border-color-light);
        border-bottom: 1px solid var(--el-border-color-light);
    }
}
.content-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
}
.input {
    font-size: 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 15px 10px 0px;
}
.textbox {
    width: 250px;
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
    margin: 0px 5px 0px 0px;
}
.info {
    width: 1000px;
}
.el-dialog__header {
    height: 0px;
    display: flex;
}
</style>
