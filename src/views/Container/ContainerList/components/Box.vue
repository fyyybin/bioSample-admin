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
                <el-popover placement="bottom" :width="200" trigger="hover" auto-close="0" :show-arrow="false">
                    <template #reference>
                        <img :src="images[container.searchCellBox(props.msg, index).sampleType]" />
                    </template>
                    <p>
                        <span>
                            <p>样本复份编号:{{ container.searchCellBox(props.msg, index).样本复份编号 }}</p>
                        </span>
                        <span>
                            <p>样本源编号:{{ container.searchCellBox(props.msg, index).样本源编号 }}</p>
                        </span>
                        <span>
                            <p>样本源姓名:{{ container.searchCellBox(props.msg, index).样本源姓名 }}</p>
                        </span>
                        <span>
                            <p>样本类型名称:{{ container.searchCellBox(props.msg, index).sampleType }}</p>
                        </span>
                    </p>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
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

const num1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const num2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const images = {
    细胞: Cell,
    全血: Blood,
    胆汁: Danzhi,
    DNA: DNA,
    RNA: RNA,
    分泌物: FMW,
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
            width: 100%;
            height: 100%;
        }
    }
    .cell_item {
        width: 50px;
        height: 50px;
        text-align: center;
        border-right: 1px solid #ffffff;
        border-bottom: 1px solid #000000;
    }
}
</style>
