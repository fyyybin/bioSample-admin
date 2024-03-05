<template>
    <div class="content">
        <div class="contentLeft">
            <el-row :gutter="20" class="leftHead">
                <el-col :span="6">
                    <el-card class="box-card"> 样本库概况 </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card"> 资源检索 </el-card>
                </el-col>
                <el-col :span="6"> <el-card class="box-card"> 样本申请 </el-card> </el-col>
                <el-col :span="6"> <el-card class="box-card"> 样本上传 </el-card></el-col>
            </el-row>
            <div class="leftCen">
                <div class="tableTitle">
                    <div style="text-align: left; width: 50%; font-weight: bold">各医院资源统计</div>
                    <div style="text-align: right; width: 50%">
                        机构统计:
                        <span>4</span>
                    </div>
                </div>
                <div style="padding-left: 20px; padding-right: 20px">
                    <el-divider style="margin: 0"></el-divider>
                </div>
                <div class="tableValue">
                    <el-table :data="LeftCenTable" style="width: 100%" border table-layout="fixed">
                        <el-table-column prop="name" label="医院名称">
                            <template #default="scope">
                                <div style="display: flex; align-items: center">
                                    <div class="avatar">
                                        <img :src="scope.row.src" />
                                    </div>
                                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="sampleTotal" label="样本资源总数（份）" />
                        <el-table-column prop="itemTotal" label="项目总数（份）" />
                        <el-table-column prop="resultTotal" label="成果总数（份）" />
                    </el-table>
                </div>
            </div>
            <div class="leftFoot">
                <div class="autoTitle">
                    <div style="text-align: left; width: 100%; font-weight: bold">自动化设备</div>
                </div>
                <div style="padding-left: 20px; padding-right: 20px">
                    <el-divider style="margin: 0"></el-divider>
                </div>
                <div class="autoValue">
                    <div class="machine" v-for="(list, index) in autoData" :key="index">
                        <div class="machineState">
                            <div class="autoBox">
                                {{ list.state }}
                                <span class="autoPoint"></span>
                            </div>
                        </div>
                        <div class="machineContent">
                            <div style="width: 70%; font-size: 8px">
                                <p style="padding: 0 2px; color: #fff">{{ list.position }}</p>
                                <p style="padding: 0 2px; color: #fff">{{ list.name }}</p>
                                <p style="padding: 0 2px; color: #fff">数量：{{ list.number }}</p>
                            </div>
                            <div style="width: 30%; display: flex; justify-content: end">
                                <img :src="list.src" style="border: 1px solid #fff; width: 57px; height: 57px" />
                            </div>
                        </div>
                        <div class="machineTem">
                            <img src="@/assets/icons/tem.svg" style="width: 30px; height: 30px; padding: 4px 0" />

                            <div style="padding-left: 16px; font-style: oblique">{{ list.tem }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentRight">
            <div class="rightHead">
                <div class="circle" style="border: 10px solid #ff8657">
                    <div>
                        待处理 <br />
                        <span> 5 </span>
                    </div>
                </div>
                <div class="circle" style="border: 10px solid #476bff">
                    <div>
                        已处理 <br />
                        <span> 5 </span>
                    </div>
                </div>
                <div class="circle" style="border: 10px solid #0faeff">
                    <div>
                        已完结 <br />
                        <span> 5 </span>
                    </div>
                </div>
            </div>
            <div class="rightCen">
                <div class="messageTitle">
                    <div style="text-align: left; width: 100%; font-weight: bold">待办事项</div>
                </div>
                <div style="padding-left: 20px; padding-right: 20px">
                    <el-divider style="margin: 0"></el-divider>
                </div>
                <div class="messageValue">
                    <img class="messageIcon" src="@/assets/icons/clock.svg" />
                    <div>您有<span>1</span>条用户信息待审核</div>
                </div>
            </div>
            <div class="rightFoot">
                <div class="tableTitle">
                    <div style="text-align: left; width: 50%; font-weight: bold">各医院资源统计</div>
                    <div style="text-align: right; width: 50%">
                        机构统计:
                        <span>4</span>
                    </div>
                </div>
                <div style="padding-left: 20px; padding-right: 20px">
                    <el-divider style="margin: 0"></el-divider>
                </div>
                <vue3-seamless-scroll :list="realData" class="scroll" :singleHeight="34">
                    <div class="item" v-for="(item, index) in realData" :key="index">
                        <span style="width: 20%; text-align: center">{{ item.name }}</span>
                        <span style="width: 20%; text-align: center">{{ item.data }}</span>
                    </div>
                </vue3-seamless-scroll>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="home">
import { homeLeftCenTable, autoMachine, realStatistics } from '@/assets/mockdata';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
// import { onMounted } from 'vue';

const LeftCenTable = homeLeftCenTable;
const autoData = autoMachine;
const realData = realStatistics;
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
    .contentLeft {
        width: 70%;
        height: 100%;
        .leftHead {
            height: 105px;
            justify-content: center;
            align-items: center;
            margin-bottom: 19px;
            .el-card {
                height: 80px;
                text-align: center;
                border: 1px solid var(--el-border-color-light);
                border-radius: 6px;
                box-shadow: 0 0 12px rgb(0 0 0 / 5%);
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
            }
        }
        .leftCen {
            width: 100%;
            background: #fff;
            height: 260px;
            margin-bottom: 29px;
            border-radius: 6px;
            box-shadow: 0 0 12px rgb(0 0 0 / 5%);
            border: 1px solid var(--el-border-color-light);
            .tableTitle {
                display: flex;
                justify-content: space-around;
                padding: 10px 20px;
            }
            .tableValue {
                padding: 5px 20px 10px 20px;
            }
        }
        .leftFoot {
            width: 100%;
            background: #fff;
            height: 250px;
            border-radius: 6px;
            box-shadow: 0 0 12px rgb(0 0 0 / 5%);
            border: 1px solid var(--el-border-color-light);
            .autoTitle {
                display: flex;
                justify-content: space-around;
                padding: 10px 20px;
            }
            .autoValue {
                display: flex;
                height: 150px;
                justify-content: space-between;
                padding: 5px 20px 10px 20px;
                .machine {
                    border-radius: 6px;

                    width: 30%;
                    background-color: var(--el-color-primary-light-1);
                }
            }
        }
    }
    .contentRight {
        width: 25%;
        height: 100%;
        .rightHead {
            height: 105px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 19px;
            .circle {
                width: 100px;
                height: 100px;
                border-radius: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                text-align: center;
                font-size: 16px;
                box-sizing: border-box;
                border: 10px solid #ff8657;
            }
        }
        .rightCen {
            width: 100%;
            background: #fff;
            height: 160px;
            margin-bottom: 19px;
            border-radius: 6px;
            box-shadow: 0 0 12px rgb(0 0 0 / 5%);
            border: 1px solid var(--el-border-color-light);
            .messageTitle {
                display: flex;
                justify-content: space-around;
                padding: 10px 20px;
            }
            .messageValue {
                display: flex;
                justify-content: space-evenly;
                padding: 10px 0px;
                margin-left: 40px;
                margin-right: 40px;
                border-bottom: 2px dashed #dedede;
                .messageIcon {
                    width: 30px;
                    height: 26px;
                }
            }
        }
        .rightFoot {
            width: 100%;
            background: #fff;
            height: 360px;
            margin-bottom: 19px;
            border-radius: 6px;
            box-shadow: 0 0 12px rgb(0 0 0 / 5%);
            border: 1px solid var(--el-border-color-light);
            .tableTitle {
                display: flex;
                justify-content: space-around;
                padding: 10px 20px;
            }
        }
    }
}
.avatar {
    width: 20px;
    height: 20px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;
    img {
        width: 100%;
        height: 100%;
    }
}
.machineState {
    display: flex;
    justify-content: left;
    padding: 10px 20px;
    .autoBox {
        width: 60px;
        height: 18px;
        background-color: #fff;
        font-size: 10px;
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .autoPoint {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #1ea504;
            border-radius: 10px;
            animation: fade 600ms infinite;
            -webkit-animation: fade 600ms infinite;
        }
        @keyframes fade {
            0% {
                opacity: 0.3;
            }

            50% {
                opacity: 0.65;
            }

            100% {
                opacity: 0.3;
            }
        }
    }
}
.machineContent {
    display: flex;
    justify-content: left;
    padding: 0 20px 10px 20px;
}
.machineTem {
    border-radius: 0 0 6px 6px;

    display: flex;
    height: auto;
    justify-content: center;
    background-color: var(--el-color-primary-light-9);
    align-items: center;
}

.scroll {
    height: 300px;
    width: 100%;
    overflow: hidden;
}

.scroll .item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2px 0;
    height: 30px;
}
</style>
