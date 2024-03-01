<template>
    <el-dropdown trigger="click">
        <div class="avatar">
            <img src="@/assets/images/avatar.gif" alt="avatar" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>
                    <el-icon><User /></el-icon>个人信息
                </el-dropdown-item>
                <el-dropdown-item divided @click="logout">
                    <el-icon><SwitchButton /></el-icon>退出登陆
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import { ElMessageBox, ElMessage } from 'element-plus';

const router = useRouter();
const userStore = useUserStore();

// 退出登录
const logout = () => {
    ElMessageBox.confirm('您是否确认退出登录?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        // 1.清除 Token
        userStore.clearToken();

        // 2.重定向到登陆页
        router.replace('/login');
        ElMessage.success('退出登录成功！');
    });
};
</script>

<style scoped lang="scss">
.avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
