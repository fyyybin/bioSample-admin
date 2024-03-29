<template>
    <div>
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
                            <el-table-column prop="drkNum" label="待入库数量" />
                            <el-table-column prop="yrkNum" label="已入库数量" />
                            <el-table-column prop="cxNum" label="测序样本数量" />
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
                                <div style="width: 70%; font-size: 12px">
                                    <p style="padding: 0 2px; color: #fff">{{ list.位置 }}</p>
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
                            审核中 <br />
                            <span> {{ ExamineStore.inProcess }} </span>
                        </div>
                    </div>
                    <div class="circle" style="border: 10px solid #009688">
                        <div>
                            已通过 <br />
                            <span> {{ ExamineStore.approved }} </span>
                        </div>
                    </div>
                    <div class="circle" style="border: 10px solid red">
                        <div>
                            未通过 <br />
                            <span> {{ ExamineStore.notApproved }} </span>
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
                    <el-scrollbar style="height: 90%">
                        <div class="message-list" v-if="!visSP">
                            <el-row class="row-bg" justify="space-between" style="padding-top: 10px">
                                <el-col :span="6"><div class="grid-content ep-bg-purple">--------</div></el-col>
                                <el-col :span="6"><div class="grid-content ep-bg-purple-light">暂无审批</div></el-col>
                                <el-col :span="6"><div class="grid-content ep-bg-purple">--------</div></el-col>
                            </el-row>
                        </div>
                        <div class="message-list" v-else>
                            <div class="message-item" v-for="(item, index) in examineData" :key="index">
                                <div class="message-content" v-if="item.用户信息 !== 'administrator'">
                                    <span class="message-title">{{ item.样本编号 }}</span>
                                    <span class="message-title">申请&nbsp;&nbsp;{{ item.操作 }}</span>
                                    <span class="message-date">样本源类型:{{ item.样本源类型 }} &nbsp;样本状态:{{ item.入库状态 }}</span>
                                </div>
                                <div class="message-content" v-if="item.用户信息 === 'administrator'">
                                    <span class="message-title">{{ item.用户信息 }}</span>
                                    <span class="message-title">申请&nbsp;&nbsp;{{ item.操作 }}</span>
                                    <span class="message-date">样本源类型:{{ item.样本源类型 }} &nbsp; 样本状态:{{ item.入库状态 }}</span>
                                </div>
                                <el-icon @click="examineDetail(item)" style="width: 30px"><InfoFilled :color="colorType(item.入库状态)" /></el-icon>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <el-dialog v-model="ExamineStore.userDialog" title="审核详情" width="800">
            <el-table :data="examineData" border max-height="400">
                <el-table-column prop="样本编号" width="240" label="样本编号" />
                <el-table-column prop="样本源姓名" width="100" label="样本源姓名" />
                <el-table-column prop="样本源类型" width="100" label="样本源类型" />
                <el-table-column prop="样本量" width="100" label="样本量" />
                <el-table-column prop="采集医院" width="210" label="所属样本组" />
                <el-table-column fixed="right" prop="入库状态" width="100" label="样本状态" />
            </el-table>
        </el-dialog>
        <el-dialog v-model="ExamineStore.adminDialog" title="审核详情" width="1000">
            <el-table :data="examineData" border style="width: 100%; height: 400px">
                <el-table-column fixed="left" prop="入库状态" width="100" label="样本状态" />
                <el-table-column prop="样本编号" width="240" label="样本编号" />
                <el-table-column prop="样本源姓名" width="100" label="样本源姓名" />
                <el-table-column prop="样本源类型" width="100" label="样本源类型" />
                <el-table-column prop="样本量" width="100" label="样本量" />
                <el-table-column prop="采集医院" width="210" label="所属样本组" />
                <el-table-column prop="操作" width="100" label="操作" />
                <el-table-column fixed="right" label="Operations" width="200">
                    <template #default="scope">
                        <el-button plain type="primary" size="small" :disabled="scope.row.入库状态 !== '审核中'" @click.prevent="PorR(scope.$index, true)">通过</el-button>
                        <el-button plain type="danger" size="small" :disabled="scope.row.入库状态 !== '审核中'" @click.prevent="PorR(scope.$index, false)">拒绝</el-button>
                        <el-button plain type="primary" size="small" @click.prevent="ExamineDel(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="home">
import { homeLeftCenTable, autoMachine } from '@/assets/mockdata';
// import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { useUserStore, useExamineStore } from '@/store';
import { ExamineSearchAPI, ExamineAPI, ExamineDelAPI, hospitalDataAPI } from '@/http/api';
import { ref } from 'vue';

const autoData = autoMachine;
// const realData = realStatistics;
const UserStore = useUserStore();
const ExamineStore = useExamineStore();
const examineData = ref([]);
const LeftCenTable = ref([]);
const visSP = ref(false);

const examineDetail = (data) => {
    if (UserStore.userInfo === 'administrator') {
        ExamineStore.adminDialog = true;
    } else {
        ExamineStore.userDialog = true;
    }
};
const colorType = (item) => {
    if (item === '审核拒绝') {
        return 'red';
    } else if (item === '审核中') {
        return '#ff8657';
    } else if (item === '已入库' || item === '已转移' || item === '已废弃' || item === '已出库') {
        return '#009688';
    }
};
searchExamine();
function PorR(index, o) {
    const formData = new FormData();
    const data = ExamineStore.examineState[index];
    formData.append('样本编号', data.样本编号);
    formData.append('操作', data.操作);
    formData.append('用户信息', data.用户信息);
    formData.append('审批时间', data.审批时间);
    formData.append('样本状态', o ? '通过' : '审核拒绝');
    ExamineAPI(formData).then((response) => {
        searchExamine();
    });
}
function searchExamine() {
    const formData = new FormData();
    formData.append('username', UserStore.userInfo);
    ExamineSearchAPI(formData).then((res) => {
        if (res.data.result) {
            ExamineStore.examineState = res.data.result;
            examineData.value = ExamineStore.examineState;
            visSP.value = true;
            ExamineStore.getApproved();
        } else {
            ExamineStore.examineState = [];
            examineData.value = ExamineStore.examineState;
            visSP.value = false;
            ExamineStore.clearApproved();
        }
    });
    hospitalDataAPI().then((res) => {
        LeftCenTable.value = [];
        homeLeftCenTable.forEach((key, index) => {
            key.drkNum = res.data.result['待入库'][index];
            key.yrkNum = res.data.result['已入库'][index];
            key.cxNum = res.data.result['测序中'][index];
            LeftCenTable.value.push(key);
        });
    });
}
const ExamineDel = (index) => {
    const formData = new FormData();
    const data = ExamineStore.examineState[index];
    formData.append('样本编号', data.样本编号);
    formData.append('操作', data.操作);
    formData.append('用户信息', data.用户信息);
    ExamineDelAPI(formData).then(() => {
        searchExamine();
    });
};
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
                padding: 10px 20px 10px 20px;
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
            height: 540px;
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
        font-size: 12px;
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
.message-list {
    display: flex;
    padding: 5px;
    flex-direction: column;
    .message-item {
        display: flex;
        align-items: center;
        margin: 5px;
        padding: 10px;
        border: 1px solid #1aa194;
        border-radius: 5px;
        justify-content: space-between;
        .message-content {
            display: flex;
            flex-direction: column;
            .message-title {
                margin-bottom: 5px;
            }
            .message-date {
                font-size: 12px;
                color: var(--el-text-color-secondary);
            }
        }
    }
}
</style>
