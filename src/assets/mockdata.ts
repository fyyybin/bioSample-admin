const homeLeftCenTable = [
    {
        name: '浙江大学医学院附属第一医院',
        src: '/src/assets/hospitals/zj1h.jpg',
        drkNum: 0,
        yrkNum: 0,
        cxNum: 0,
    },
    {
        name: '浙江大学医学院附属第四医院',
        src: '/src/assets/hospitals/zj4h.jpg',
        drkNum: 0,
        yrkNum: 0,
        cxNum: 0,
    },
    {
        name: '台州医院',
        src: '/src/assets/hospitals/tzh.jpg',
        drkNum: 0,
        yrkNum: 0,
        cxNum: 0,
    },
    {
        name: '浙江大学医学院附属儿童医院',
        src: '/src/assets/hospitals/zjeb.jpg',
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
            title: '样本保存',
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
    {
        path: '/test/',
        name: 'test',
        component: '/upload',
        meta: {
            icon: 'InfoFilled',
            title: '测试',
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
        name: '浙江科技大学BitLab实验室',
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
