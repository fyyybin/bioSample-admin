<template>
    <div style="display: flex; justify-content: center">
        <el-collapse class="con" :loading="loading" v-model="activeName">
            <el-collapse-item style="margin: 5px 2px 0px 5px" name="1">
                <template #title>
                    <img :src="getImageUrl(1)" class="table-btn" />
                    <span class="info-title">样本源</span>
                </template>
                <div class="info-content">
                    <el-descriptions :column="4" size="small" border>
                        <el-descriptions-item v-for="(doc, index) in detail_titles['样本信息']" :key="index">
                            <template #label>{{ doc }}</template>
                            {{ details[doc] }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </el-collapse-item>
            <el-collapse-item style="margin: 5px 2px 0px 5px" name="2">
                <template #title>
                    <img :src="getImageUrl(2)" class="table-btn" />
                    <span class="info-title">采集信息</span>
                </template>
                <div class="info-content">
                    <el-table :data="sampleList" border v-loading="loading" element-loading-text="数据正在加载中..." :element-loading-svg="svg" style="width: 100%; margin-top: 5px; font-size: 12px">
                        <el-table-column v-for="(item, index) in identifyheaders" :key="index" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
                        <el-table-column label="采集状态" width="98px">
                            <template #default="scope">
                                <el-tag v-if="scope.row.采集状态=='已完成'" type="success">{{ scope.row['采集状态'] }}</el-tag>
                                <el-tag v-if="scope.row.采集状态=='未知'" type="warning">{{ scope.row['采集状态'] }}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { detail_titles, identifyheaders } from '../variable';
import { onMounted, ref } from 'vue';
import { samplefromQuery, collectionSample } from '@/http/api';
const activeName = ref(['1','2'])
const props = defineProps({
    params: String,
});
const details = ref([]);
const loading = ref(true);
// 样本详细信息
const getData = () => {
    samplefromQuery(props.params).then((response) => {
        let result = response.data;
        details.value = result.data;
        loading.value = false;
    });
};

const sampleList = ref([]);
const sampleData = () => {
    collectionSample(props.params).then((response) => {
        let result = response.data;
        sampleList.value = result.data;
        loading.value = false;
    });
};
onMounted(() => {
    () => props;
    getData();
    sampleData();
});
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
const getImageUrl = (item) => {
    if (item == 1) return new URL('@/assets/images/yangben.png', import.meta.url).href;
    else if (item == 2) return new URL('@/assets/images/caiji.png', import.meta.url).href;
};
</script>

<style>
.con {
    width: 95%;
    margin-bottom: 20px;
    height: auto;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
}
.table-btn {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.info-content {
    padding: 1% 10% 1% 4%;
}
.info-title {
    font-size: 16px;
    font-weight: bold;
}
</style>
