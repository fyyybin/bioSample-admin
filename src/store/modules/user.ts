import { defineStore } from 'pinia';
import { PersistedStateOptions } from 'pinia-plugin-persistedstate';
/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[]) => {
    const persist: PersistedStateOptions = {
        key,
        storage: localStorage,
        // storage: sessionStorage,
        paths,
    };
    return persist;
};

const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        userInfo: '',
    }),
    actions: {
        setToken(token: string) {
            localStorage.setItem('token', token);
            this.token = token;
        },
        setUserInfo(userInfo) {
            localStorage.setItem('userInfo', userInfo);
            this.userInfo = userInfo;
        },
        clearToken() {
            localStorage.removeItem('token');
            this.token = '';
        },

        // clearUsertInfo() {
        //     localStorage.removeItem('userInfo');
        //     this.userInfo = {};
        // },
    },
    persist: piniaPersistConfig('user'),
});

export default useUserStore;
