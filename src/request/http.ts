import base from './base';
import axios, { AxiosRequestConfig } from 'axios';
const instance = axios.create({
    timeout: 1000 * 10, // 超时时间 10s
});

instance.defaults.baseURL = base.baseurl;

interface AxiosConfig extends AxiosRequestConfig {
    loading?: boolean;
}

const Fetch = ({
    url = '',
    method = 'GET',
    data = {},
    params = {},
    headers = {
        'Contont-Type': 'application/json',
    },
    loading = true,
}: AxiosConfig) => {
    if (localStorage.getItem('token')) {
        Object.assign(headers, {
            token: localStorage.getItem('token'),
        });
    }
    if (loading) {
    }
    return new Promise((resolve, reject) => {
        instance({
            url,
            method,
            data,
            params,
            headers,
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default Fetch;
