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
// 添加细胞接口
export function CellAddAPI(data) {
    //接口ILoginData接口的变量名
    return service({
        url: '/container_cell/add/',
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
