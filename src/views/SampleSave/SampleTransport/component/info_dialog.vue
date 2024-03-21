<template>
    <div style="display: flex; justify-content: center">
        <el-collapse class="con">
            <el-collapse-item style="margin: 5px 2px 0px 5px" v-for="(item, index) in detail_headers" :key="index">
                <template #header>
                    <img :src="getImageUrl(item.icon)" class="table-btn" />
                    <span class="info-title">{{ item.label }}</span>
                </template>
                <div class="info-content">
                    <el-descriptions :column="item.cols" size="small" border>
                        <el-descriptions-item v-for="(doc, index) in detail_titles[item.label]" :key="index">
                            <template #label>{{ doc }}</template>
                            {{ details[doc] }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { detail_headers, detail_titles } from '../../variable';
import { onMounted, ref } from 'vue';
import { collectionInfo } from '@/http/api';
const props = defineProps({
    params: String,
    content: String,
    hospital: String,
});
const querys = {
    样本源编号: props.params,
    样本类型: props.content,
    采集医院: props.hospital,
};
const details = ref({});
const loading = ref(true);
// 样本详细信息
const getData = () => {
    collectionInfo(querys).then((response) => {
        let result = response.data;
        details.value = result.data;
        loading.value = false;
    });
};

onMounted(() => {
    () => props;
    getData();
});

const getImageUrl = (name) => {
    return new URL(name, import.meta.url).href;
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
