const homeLeftCenTable = [
    {
        name: '浙江大学医学院附属第一医院',
        src: '/src/assets/hospitals/zj1h.jpg',
        sampleTotal: '0',
        itemTotal: '1',
        resultTotal: '12',
    },
    {
        name: '浙江大学医学院附属第四医院',
        src: '/src/assets/hospitals/zj4h.jpg',
        sampleTotal: '123',
        itemTotal: '1',
        resultTotal: '12',
    },
    {
        name: '台州医院',
        src: '/src/assets/hospitals/tzh.jpg',
        sampleTotal: '550',
        itemTotal: '1',
        resultTotal: '12',
    },
    {
        name: '浙江大学医学院附属儿童医院',
        src: '/src/assets/hospitals/zjeb.jpg',
        sampleTotal: '782',
        itemTotal: '1',
        resultTotal: '12',
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
                    icon: 'Menu',
                    title: '样本转移',
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
        path: '/sampleSave',
        name: 'sampleSave',
        redirect: '/sampleSave',
        meta: {
            icon: 'MessageBox',
            title: '样本保存',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: true,
        },
        children: [
            {
                path: '/sampleSave/position',
                name: 'transport',
                component: '/sampleSave/position/index',
                meta: {
                    icon: 'Menu',
                    title: '样本位置',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/sampleSave/temperature',
                name: 'temperature',
                component: '/sampleSave/temperature/index',
                meta: {
                    icon: 'Menu',
                    title: '保存温度',
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
        path: '/auth',
        name: 'auth',
        redirect: '/auth/menu',
        meta: {
            icon: 'Lock',
            title: '权限管理',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: true,
        },
        children: [
            {
                path: '/auth/menu',
                name: 'authMenu',
                component: '/auth/menu/index',
                meta: {
                    icon: 'Menu',
                    title: '菜单权限',
                    isLink: '',
                    isHide: false,
                    isFull: false,
                    isAffix: false,
                    isKeepAlive: true,
                },
            },
            {
                path: '/auth/button',
                name: 'authButton',
                component: '/auth/button/index',
                meta: {
                    icon: 'Menu',
                    title: '按钮权限',
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
        path: '/about/index',
        name: 'about',
        component: '/about/index',
        meta: {
            icon: 'InfoFilled',
            title: '关于项目',
            isLink: '',
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: true,
        },
    },
];
const autoMachine = [
    {
        state: '运行',
        name: '浙江大学医学院附属第一医院',
        position: 'Liconic自动化冰箱',
        number: '1',
        src: '/src/assets/images/zj1h.png',
        tem: '-80℃',
    },
    {
        state: '运行',
        name: '浙江科技学院BitLab实验室',
        position: 'Liconic自动化冰箱',
        number: '1',
        src: '/src/assets/images/bitlab.jpg',
        tem: '-80℃',
    },
    {
        state: '运行',
        name: '浙江大学医学院附属儿童医院',
        position: 'Liconic自动化冰箱',
        number: '1',
        src: '/src/assets/images/zjeb.jpg',
        tem: '-80℃',
    },
];
const realStatistics = [
    {
        name: '胆汁',
        data: '9份',
    },
    {
        name: '尿沉渣',
        data: '100份',
    },
    {
        name: '尿液',
        data: '150份',
    },
    {
        name: '粪便',
        data: '201份',
    },
    {
        name: '癌组织',
        data: '188份',
    },
    {
        name: '白细胞',
        data: '99份',
    },

    {
        name: '肝癌',
        data: '188份',
    },
    {
        name: '前列腺',
        data: '99份',
    },
    {
        name: '腹部',
        data: '28份',
    },
    {
        name: '淋巴癌',
        data: '28份',
    },
    {
        name: '宫颈癌',
        data: '28份',
    },
    {
        name: '直肠癌',
        data: '28份',
    },
    {
        name: '鼻咽癌',
        data: '28份',
    },
    {
        name: '血清',
        data: '28份',
    },
];

export { homeLeftCenTable, autoMachine, realStatistics, MenuList };
