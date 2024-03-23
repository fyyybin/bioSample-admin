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
        url: '/container_cel/del/',
        method: 'POST',
        data,
    });
}
//出库细胞接口
export function CellOutAPI(data) {
    //接口ILoginData接口的变量名
    return service({
        url: '/container_cel/out/',
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
// 审核删除
export function ExamineDelAPI(data) {
    return service({
        url: '/examine/del',
        method: 'POST',
        data,
    });
}
// 样本源查询
export function sampleFromSearch(data) {
    return service({
        url: '/samplefrom/' + data,
        method: 'GET',
    });
}
// 样本源增加
export function sampleFromAdd(data) {
    return service({
        url: '/samplefrom/add/',
        method: 'POST',
        data,
    });
}
// 样本源删除
export function sampleFromDel(data) {
    return service({
        url: '/samplefrom/delete/' + data + '/',
        method: 'DELETE',
    });
}
// 样本源修改
export function sampleFromAgree(data) {
    return service({
        url: '/samplefrom/agree/add/',
        method: 'POST',
        data,
    });
}
// 知情同意查询
export function sampleFromAgreeSearch() {
    return service({
        url: '/samplefrom/agree/',
        method: 'GET',
    });
}
// samplefrom Query
export function samplefromQuery(data) {
    return service({
        url: '/samplefrom/query/' + data,
        method: 'GET',
    });
}
// collection添加
export function collectionAdd(data) {
    return service({
        url: '/collection/add/',
        method: 'POST',
        data,
    });
}
// collection 样本
export function collectionSample(data) {
    return service({
        url: '/collection/' + data,
        method: 'GET',
    });
}
// collection 样本
export function collectionSearch() {
    return service({
        url: '/collection/',
        method: 'GET',
    });
}
// collection info
export function collectionInfo(item) {
    return service({
        url: '/collection/info/',
        method: 'POST',
        data: item,
    });
}
export function collectionCom(item) {
    return service({
        url: '/collection/complete/',
        method: 'POST',
        data: item,
    });
}
export function collectionTrans(item) {
    return service({
        url: '/collection/transport/',
        method: 'POST',
        data: item,
    });
}
export function collectionAcc(item) {
    return service({
        url: '/collection/accept/',
        method: 'POST',
        data: item,
    });
}
// 资源统计
export function collectionHospital() {
    return service({
        url: '/collection/hospital/',
        method: 'GET',
    });
}