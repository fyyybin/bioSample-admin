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
