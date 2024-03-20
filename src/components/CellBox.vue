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
            <div v-for="index of 81" :key="index" class="cell_item2" :style="mouseclick === index ? 'background-color:#009688' : ''" @click="boxDetail(index)">
                <el-popover placement="bottom" :width="200" trigger="hover" :show-arrow="false">
                    <template #reference>
                        <img :src="images[searchCellBox(props.msg, index).样本类型]" />
                    </template>
                    <p>
                        <span>
                            <p>样本源编号:{{ searchCellBox(props.msg, index).样本源编号 }}</p>
                        </span>
                        <span>
                            <p>样本源姓名:{{ searchCellBox(props.msg, index).样本源姓名 }}</p>
                        </span>
                        <span>
                            <p>样本类型名称:{{ searchCellBox(props.msg, index).样本类型 }}</p>
                        </span>
                    </p>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Cell from '@/assets/images/container/cell.png';
import Blood from '@/assets/images/container/blood.png';
import Danzhi from '@/assets/images/container/danzhi.png';
import DNA from '@/assets/images/container/dna.png';
import RNA from '@/assets/images/container/rna.png';
import FMW from '@/assets/images/container/fenmiwu.png';
import { ref } from 'vue';
const props = defineProps({
    msg: Array,
});
const mouseclick = ref(0);
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
const searchCellBox = (data, i) => {
    for (const item of data) {
        if (item.POS === i) {
            return item;
        }
    }
    return {
        样本类型: '暂无',
        POS: i,
    };
};
//定义要发送的事件名称，如 aList
const emit = defineEmits(['cellDetail']);

//点击后将aList事件发送给父组件
const boxDetail = (index) => {
    mouseclick.value = index;
    emit('cellDetail', searchCellBox(props.msg, index));
};

// const boxDetail = (index) => {
//     displayCell.value = searchCellBox(props.msg, index);
//     container.displayItem = true;
// };
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
</style>
