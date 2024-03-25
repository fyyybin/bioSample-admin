<template>
    <div class="right">
        <div class="rightfor">
            <!-- 冰箱 -->
            <div class="fridgeBOX" style="width: 631px">
                <div class="fridgeBoxContent">
                    <div class="content" style="height: 100px">
                        <p style="text-align: center">
                            <span v-for="item in props.msg" :key="item.label" :style="{ 'background-color': choose === item.label ? '#f8e3c5' : '#fff' }" @click="getClickItem(item)"
                                >{{ item.label }}<br />
                                {{ container.getCellsNumRate(item, views[props.level]) }}</span
                            >
                        </p>
                    </div>
                </div>
                <div style="width: 60px; height: 60px">
                    <div style="background-color: #00ff00; width: 7px; height: 20px"><p style="padding-left: 10px; color: #00ff00; margin: 0">20%</p></div>
                    <div style="background-color: #ff6600; width: 7px; height: 20px"><p style="padding-left: 10px; color: #ff6600; margin: 0">80%</p></div>
                    <div style="background-color: #ff0000; width: 7px; height: 20px"><p style="padding-left: 10px; color: #ff0000; margin: 0">100%</p></div>
                </div>
            </div>
        </div>

        <div class="infor">
            <div style="display: block">
                <div class="infor_1">
                    <ul class="infor_btn">
                        <h3 style="margin: 8px; color: #ffffff">基本信息</h3>
                    </ul>
                    <div class="infor_text">
                        <div style="width: 70%; font-size: 14px">
                            <p style="padding: 0 2px">名称:{{ props.name }}</p>
                            <p style="padding: 0 2px">描述:</p>
                            <p style="padding: 0 2px">样本总数:{{ container.getCellsNum(props.msg) }}</p>
                            <p style="padding: 0 2px">样本空间占有率:{{ container.getCellsNumRate(props.msg, views[props.level - 1]) }}</p>
                            <p style="padding: 0 2px">所存样本源类型:全血,脑脊液</p>
                        </div>
                    </div>
                </div>
                <div class="infor_1" style="display: block; margin-top: 20px" v-if="container.displayItem">
                    <ul class="infor_btn">
                        <h3 style="margin: 8px; color: #ffffff">详细信息</h3>
                    </ul>
                    <div class="infor_text">
                        <div style="width: 70%; font-size: 14px">
                            <p style="padding: 0 2px">位置:{{ directionItem.label }}</p>
                            <p style="padding: 0 2px">样本总数:{{ container.getCellsNum(directionItem.level !== 6 ? directionItem.children : directionItem) }}</p>
                            <p style="padding: 0 2px">样本空间占有率:{{ container.getCellsNumRate(directionItem.level !== 6 ? directionItem.children : directionItem, views[props.level]) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useContainerStore } from '@/store';
const props = defineProps({
    msg: Array,
    name: String,
    level: Number,
});
const views = ['room', 'item', 'layer', 'frame', 'line', 'box'];
const choose = ref('');
const directionItem = ref([]);
const container = useContainerStore();

const getClickItem = (n) => {
    choose.value = n.label;
    directionItem.value = n;
    container.displayItem = true;
};
</script>

<style scoped>
.right {
    width: 100%;
    display: inline-block;
    padding: 5px 15px;
    margin-top: 15px;
    .rightfor {
        width: 60%;
        float: left;
        position: relative;
        padding-bottom: 20px;
        .fridgeBOX {
            padding-top: 10px;
            display: flex;
            .fridgeBoxContent {
                width: 100%;
                float: left;
            }
            .content {
                width: 60%;
                border: 2px solid #757575;
                padding: 0px 5px;
                border-radius: 20px;
                display: inline-block;
                float: left;
                margin-left: 7px;
                min-height: 110px;
            }
            .content p span {
                border-width: 1px;
                border-style: solid;
                display: inline-block;
                padding: 20px 1px;
                color: #666;
                font: 12px Microsoft Yahei;
                border-radius: 4px;
                margin-left: 5px;
                margin-right: 5px;
                cursor: pointer;
                width: 20%;
                text-align: center;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .door {
                float: left;
                border-radius: 20px;
                padding: 2px 0;
                perspective: 150px;
                perspective-origin: left;
                margin-left: -1px;
                min-width: 120px;
                .doorContent {
                    /* width: 100%;
                    height: 400px;
                    border: #757575 2px solid;
                    border-radius: 10px;
                    transform: rotateY(-3deg);
                    perspective: 150px;
                    padding-left: 20px;
                    position: relative;
                    padding-bottom: 20px;
                    min-height: 300px; */
                    padding-left: 10px;
                }
            }
            .door p {
                width: 90px;
                text-align: center;
                height: 84px;
                transform: rotateY(3deg);
                color: #666;
                margin: 10px 0;
                /* line-height: 70px; */
            }
            .door p span {
                display: inline-block;
                cursor: pointer;
                display: inline-block;
                padding: 2px 15px;
                background: #ccc;
                /* border: 1px solid #ccc; */
                margin: 20px 0;
                font-size: 12px;
                transform: rotateY(3deg);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 60px;
            }
        }
    }
    .infor {
        width: 30%;
        display: flex;
        padding-left: 100px;
        .infor_1 {
            width: 300px;
            border-radius: 5px;
            box-shadow: 0 0 10px #ccc;
            padding-bottom: 20px;
            .infor_btn {
                width: 300px !important;
                float: left;
                border-radius: 5px 5px 0 0;
                padding-left: 0;
                background: #66c0b8;
                margin: 0;
                text-align: center;
            }
            .infor_text {
                display: flex;
                justify-content: left;
                padding: 0 20px 10px 20px;
            }
        }
    }
}
</style>
