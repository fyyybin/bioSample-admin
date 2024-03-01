import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home/index.vue'),
        meta: {
            title: '首页',
            layout: true,
            icon: 'HomeFilled',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/index.vue'),
        meta: {
            title: '登陆',
            layout: false,
        },
    },
    {
        path: '/container/list',
        name: 'ContainerList',
        component: () => import('../views/Container/ContainerList/index.vue'),
        meta: {
            title: '容器列表',
            layout: true,
        },
    },
    {
        path: '/container/transport',
        name: 'ContainerTransport',
        component: () => import('../views/Container/ContainerTransport/index.vue'),
        meta: {
            title: '容器转移',
            layout: true,
        },
    },
    {
        path: '/sampleProcess',
        name: 'sampleProcess',
        component: () => import('../views/SampleProcess/index.vue'),
        meta: {
            title: '样本处理',
            layout: true,
            icon: 'Histogram',
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem('token')) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
