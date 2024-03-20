//我要用到的一些接口
import service from '@/http/request';
// import { ILoginData } from '@/type/login'; //引入接口

// 登录接口
export function LoginAPI(data) {
    //接口ILoginData接口的变量名
    return service({
        url: '/auth/',
        method: 'POST',
        data,
    });
}
// 细胞库接口
export function CellAPI() {
    //接口ILoginData接口的变量名
    return service({
        url: '/container_cell/',
        method: 'POST',
        data: '',
    });
}
// 待入库细胞查询接口
export function CellAddAPI() {
    //接口ILoginData接口的变量名
    return service({
        url: '/container_cell/add/',
        method: 'POST',
    });
}
// 细胞入库接口
export function CellStorageAPI(data) {
    //接口ILoginData接口的变量名
    return service({
        url: '/container_cell/storage/',
        method: 'POST',
        data,
    });
}
// 删除细胞接口
export function CellDelAPI(data) {
    //接口ILoginData接口的变量名
    return service({
        url: '/container_cell/del/',
        method: 'POST',
        data,
    });
}
// 转移细胞接口
export function CellTransAPI(data) {
    return service({
        url: '/container_cell/trans/',
        method: 'POST',
        data,
    });
}
// 审核接口
export function ExamineSearchAPI(data) {
    return service({
        url: '/examineSearch/',
        method: 'POST',
        data,
    });
}
// 审核Pass接口
export function ExamineAPI(data) {
    return service({
        url: '/examine/',
        method: 'POST',
        data,
    });
}
