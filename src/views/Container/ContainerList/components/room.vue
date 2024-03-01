<template>
    <div style="justify-content: space-between; display: flex">
        <div class="Content" v-for="bx in props.msg" :key="bx.level">
            <el-popover placement="bottom" :width="200" trigger="hover" :show-arrow="false">
                <template #reference>
                    <img src="@/assets/images/bx.png" />
                </template>
                <p>
                    <span>
                        <p>详细信息</p>
                    </span>
                    <span>
                        <p>编号：{{ bx.label }}</p>
                    </span>
                    <span>
                        <p>名称：{{ bx.label }}</p>
                    </span>
                </p>
            </el-popover>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    msg: Array,
});
</script>

<style scoped>
.Content {
    width: 250px;
    height: 250px;
    margin: 5px 5px;
    float: left;
    border: 2px solid #0070c1;
    position: relative;
    transition: ease-out 0.5s;
    border-radius: 13px;
    box-sizing: border-box;
    overflow: hidden;
}
</style>
