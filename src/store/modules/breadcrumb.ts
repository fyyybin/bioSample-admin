import { defineStore } from 'pinia';
const getAllBreadcrumbList = (menuList, parent = [], result = {}) => {
    for (const item of menuList) {
        result[item.path] = [...parent, item];
        if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
    }
    return result;
};

const useBreadCrumb = defineStore('breadcrumb', {
    state: () => ({
        MenuList: [],
    }),
    getters: {
        // 递归处理后的所有面包屑导航列表
        breadcrumbListGet: (state) => (path) => {
            return getAllBreadcrumbList(state.MenuList)[path];
        },
    },
    actions: {
        getMenuList(data) {
            this.MenuList = data;
        },
    },
});
export default useBreadCrumb;
