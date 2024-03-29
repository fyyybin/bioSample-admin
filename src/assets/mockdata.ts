const homeLeftCenTable = [
    {
        name: '浙江大学医学院附属第一医院',
        src: new URL('@/assets/hospitals/zj1h.jpg', import.meta.url).href,
        drkNum: 0,
        yrkNum: 0,
        cxNum: 0,
    },
    {
        name: '浙江大学医学院附属第四医院',
        src: new URL('@/assets/hospitals/zj4h.jpg', import.meta.url).href,
        drkNum: 0,
        yrkNum: 0,
        cxNum: 0,
    },
    {
        name: '台州医院',
        src: new URL('@/assets/hospitals/tzh.jpg', import.meta.url).href,
        drkNum: 0,
        yrkNum: 0,
        cxNum: 0,
    },
    {
        name: '浙江大学医学院附属儿童医院',
        src: new URL('@/assets/hospitals/zjeb.jpg', import.meta.url).href,
        drkNum: 0,
        yrkNum: 0,
        cxNum: 0,
    },
];
const MenuList = [
    {
        path: '/',
        name: 'home',
        component: '/home/index',
        meta: {
            icon: 'HomeFilled',
            title: '首页',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: true,
            isKeepAlive: true,
        },
    },
    {
        path: '/SampleSave',
        name: 'SampleSave',
        meta: {
            icon: 'MessageBox',
            title: '样本处理',
            isLink: '',
            isHide: false,
            isFull: true,
            isAffix: false,
            isKeepAlive: true,
        },
        children: [
            {
                path: '/samplesave/resources',
                name: 'Resource',
                meta: {
                    icon: 'Document',
                    title: '样本源管理',
                    isLink: '',
                    isHide: false,
                    isFull: true,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/samplesave/agreement',
                name: 'Agreement',
                meta: {
                    icon: 'DocumentAdd',
                    title: '样本采集',
                    isLink: '',
                    isHide: false,
                    isFull: true,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/samplesave/transport',
                name: 'SamplesaveTransport',
                meta: {
                    icon: 'Edit',
                    title: '样本操作',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
        ],
    },
    {
        path: '/Container',
        name: 'Container',
        meta: {
            icon: 'Histogram',
            title: '样本存储',
            isLink: '',
            isHide: false,
            isFull: true,
            isAffix: false,
            isKeepAlive: true,
        },
        children: [
            {
                path: '/container/list',
                name: 'ContainerList',
                meta: {
                    icon: 'Menu',
                    title: '容器列表',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/container/transport',
                name: 'ContainerTransport',
                meta: {
                    icon: 'Switch',
                    title: '样本转移',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/container/sequence',
                name: 'ContainerSequence',
                meta: {
                    icon: 'Memo',
                    title: '样本测序',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
        ],
    },
];
const autoMachine = [
    {
        state: '运行',
        name: '浙江大学医学院附属第一医院',
        position: 'Liconic自动化冰箱',
        number: '1',
        src: new URL('@/assets/images/zj1h.png', import.meta.url).href,
        tem: '-80℃',
    },
    {
        state: '运行',
        name: '浙江科技大学BitLab实验室',
        position: 'Liconic自动化冰箱',
        number: '1',
        src: new URL('@/assets/images/bitlab.jpg', import.meta.url).href,
        tem: '-80℃',
    },
    {
        state: '运行',
        name: '浙江大学医学院附属儿童医院',
        position: 'Liconic自动化冰箱',
        number: '1',
        src: new URL('@/assets/images/zjeb.jpg', import.meta.url).href,
        tem: '-80℃',
    },
];

export { homeLeftCenTable, autoMachine, MenuList };
