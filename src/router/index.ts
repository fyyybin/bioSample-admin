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
        path: '/container/sequence',
        name: 'ContainerSequence',
        component: () => import('../views/Container/SampleSequence/index.vue'),
        meta: {
            title: '样本测序',
            layout: true,
        },
    },
    {
        path: '/samplesave/resources',
        name: 'Resources',
        component: () => import('../views/SampleSave/Resources/index.vue'),
        meta: {
            title: '样本源',
            layout: true,
        },
    },
    {
        path: '/samplesave/agreement',
        name: 'Agreement',
        component: () => import('../views/SampleSave/Agreements/index.vue'),
        meta: {
            title: '样本采集',
            layout: true,
        },
    },
    {
        path: '/samplesave/transport',
        name: 'SamplesaveTransport',
        component: () => import('../views/SampleSave/SampleTransport/index.vue'),
        meta: {
            title: '样本操作',
            layout: true,
        },
    },

    {
        path: '/test/',
        name: 'test',
        component: () => import('../views/upload.vue'),
        meta: {
            title: '测试',
            layout: true,
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
