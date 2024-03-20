<template>
    <div class="message">
        <el-popover placement="bottom" :width="310" trigger="click">
            <template #reference>
                <el-badge :value="examineData.length" class="item">
                    <el-icon class="iconFont iconMessage"><Message /></el-icon>
                </el-badge>
            </template>
            <div class="message-list">
                <div class="message-item" v-for="(item, index) in examineData" :key="index">
                    <div class="message-content" v-if="item.用户信息 !== 'admin'">
                        <span class="message-title">{{ item.样本源编号 }}</span>
                        <span class="message-title">申请{{ item.操作 }}</span>
                        <span class="message-date">样本类型:{{ item.样本类型 }} &nbsp;样本状态:{{ item.入库状态 }}</span>
                    </div>
                    <div class="message-content" v-if="item.用户信息 === 'admin'">
                        <span class="message-title">{{ item.用户信息 }}</span>
                        <span class="message-title">申请{{ item.操作 }}</span>
                        <span class="message-date">样本类型:{{ item.样本类型 }} &nbsp; 样本状态:{{ item.入库状态 }}</span>
                    </div>
                    <el-icon @click="examineDetail(item)" style="width: 30px"><InfoFilled /></el-icon>
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import { useExamineStore } from '@/store';
import { computed } from 'vue';
</script>

<style scoped lang="scss">
.iconFont {
    font-size: 24px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    justify-content: center;
    cursor: pointer;
}
.iconMessage::before {
    font-size: 21.2px;
}
.message-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 260px;
    line-height: 45px;
}
.message-list {
    display: flex;
    flex-direction: column;
    .message-item {
        display: flex;
        align-items: center;
        padding: 2px;
        border: 1px solid #1aa194;
        border-top: 5px solid #1aa194;
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
