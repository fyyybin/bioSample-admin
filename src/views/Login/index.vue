<template>
    <div class="login-container flx-center">
        <div class="login-box">
            <div class="login-form">
                <div class="login-logo">
                    <img class="login-icon" src="../..//assets/icons/logo.svg" alt="" />
                    <h2 class="logo-text">生物样本数据管理系统</h2>
                </div>

                <el-form ref="loginFormRef" size="large" :model="loginForm" :rules="loginRules">
                    <el-form-item prop="username">
                        <el-input placeholder="用户名：admin / user" v-model="loginForm.username">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <user />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码：123456" show-password autocomplete="new-password" v-model="loginForm.password">
                            <template #prefix>
                                <el-icon class="el-input__icon">
                                    <lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class="login-btn">
                    <el-button :icon="CircleClose" round size="large"> 重置 </el-button>
                    <el-button :icon="UserFilled" round size="large" type="primary" @click="onSubmit"> 登录 </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CircleClose, UserFilled } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
import { LoginAPI } from '@/http/api';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';
interface LoginFormState {
    username: string;
    password: string;
}
const router = useRouter();
const loginFormRef = ref();
const UserStore = useUserStore();
const loginForm: LoginFormState = reactive({
    username: '',
    password: '',
});

const loginRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
    ],
};

const onSubmit = () => {
    loginFormRef.value.validate().then(() => {
        const formData = new FormData();
        formData.append('username', loginForm.username);
        formData.append('password', loginForm.password);
        LoginAPI(formData).then((res) => {
            UserStore.setToken(res.data.token);
            UserStore.setUserInfo(res.data.name);
            router.push({ path: '/' });
        });
    });
};
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
