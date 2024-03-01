import { defineStore } from 'pinia';
const getAllContainerList = (ContainerList, parent = [], result = {}) => {
    for (const item of ContainerList) {
        result[item.label] = [...parent, item];
        if (item.children) getAllContainerList(item.children, result[item.label], result);
    }
    return result;
};
const CalculateCellNum = (data, level = 1, num = 0) => {
    if (level < 6) {
        for (const item of data) {
            if (item.children) num = CalculateCellNum(item.children, num);
            else num = num + item.cells.length;
        }
    }
    return num;
};
const useContainerStore = defineStore('container', {
    state: () => ({
        ContainerList: [],
        displayItem: false,
        list: { item: 25920, layer: 6480, frame: 1296, line: 324, Box: 81 },
    }),
    getters: {
        // 递归处理后的所有面包屑导航列表
        ContainerListGet: (state) => (path) => {
            return getAllContainerList(state.ContainerList)[path];
        },
    },
    actions: {
        getContainerList(data) {
            this.ContainerList = data;
        },
        getCellsNum(data) {
            return CalculateCellNum(data);
        },
        getColor(data, n) {
            const m = CalculateCellNum(data);
            if (m < this.list[n] * 0.2) {
                return '#00ff00';
            } else if (m < this.list[n] * 0.8 && m > this.list[n] * 0.2) {
                return '#ff6600';
            } else {
                return '#ff0000';
            }
        },
        // 递归计算细胞数量
        getCellsNumRate(data, l, n) {
            return Math.floor((CalculateCellNum(data, l) * 10000) / this.list[n]) / 100 + '%';
        },
    },
});

export default useContainerStore;
