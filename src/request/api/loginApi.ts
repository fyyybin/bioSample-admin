import Fetch from '../http';

export const LoginAPI = {
    setLogin(data) {
        return Fetch({
            method: 'POST',
            url: '/api/login',
            data,
        });
    },
};

export const LogoutAPI = {};
