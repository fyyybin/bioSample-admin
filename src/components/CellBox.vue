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
            <div v-for="index of 81" :key="index" class="cell_item2" :style="mouseClick.indexOf(index) === -1 ? '' : 'background-color:#009688'" @click="boxDetail(index)">
                <el-popover placement="bottom" :width="200" trigger="hover" :show-arrow="false">
                    <template #reference>
                        <img :src="images[searchCellBox(props.msg, index).样本源类型]" width="50" />
                    </template>
                    <p>
                        <span>
                            <p>样本源编号:{{ searchCellBox(props.msg, index).样本源编号 }}</p>
                        </span>
                        <span>
                            <p>样本源姓名:{{ searchCellBox(props.msg, index).样本源姓名 }}</p>
                        </span>
                        <span>
                            <p>样本源类型名称:{{ searchCellBox(props.msg, index).样本源类型 }}</p>
                        </span>
                    </p>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Blood from '@/assets/images/container/blood.png';
import XQ from '@/assets/images/container/血清.png';
import XJ from '@/assets/images/container/外部血浆.png';
import ZuZhi from '@/assets/images/container/zuzhi.png';
import NJY from '@/assets/images/container/naojiye.png';
import FB from '@/assets/images/container/粪便.png';
import NY from '@/assets/images/container/尿液.png';
import { ref } from 'vue';
const props = defineProps({
    msg: Array,
});
const mouseClick = ref([]);
const num1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const num2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const images = {
    全血: Blood,
    血清: XQ,
    血浆: XJ,
    组织: ZuZhi,
    脑脊液: NJY,
    尿液: NY,
    粪便: FB,
    暂无: '',
};
const CellBox = (data, indexs) => {
    const result = [];
    for (const num of indexs) {
        if (data.length === 0) {
            result.push({ 样本源类型: '暂无', POS: num });
        } else {
            for (let i = 0; i < data.length; i++) {
                if (data[i].POS === num) {
                    result.push(data[i]);
                    break;
                }
                if (i === data.length - 1) {
                    result.push({ 样本源类型: '暂无', POS: num });
                }
            }
        }
    }
    return result;
};
const searchCellBox = (data, index) => {
    for (const item of data) {
        if (item.POS === index) {
            return item;
        }
    }
    return { 样本源类型: '暂无', POS: index };
};
//定义要发送的事件名称，如 aList
const emit = defineEmits(['cellDetail']);

//点击后将aList事件发送给父组件
const boxDetail = (index) => {
    if (mouseClick.value.indexOf(index) === -1) {
        mouseClick.value.push(index);
    } else {
        mouseClick.value.splice(mouseClick.value.indexOf(index), 1);
    }
    emit('cellDetail', CellBox(props.msg, mouseClick.value));
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
