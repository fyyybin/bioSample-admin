const sampleType = [
    {
        value: '全血',
        label: '全血',
        icon: 'Folder',
    },
    {
        value: '血清',
        label: '血清',
        icon: 'Folder',
    },
    {
        value: '血浆',
        label: '血浆',
        icon: 'Folder',
    },
    {
        value: '组织',
        label: '组织',
        icon: 'Folder',
        children: [
            {
                label: '全血',
                value: '全血',
                icon: 'Folder',
            },
            {
                value: '淋巴结',
                label: '淋巴结',
                icon: 'Folder',
            },
            {
                value: '胆囊',
                label: '胆囊',
                icon: 'Folder',
            },
            {
                value: '肝脏',
                label: '肝脏',
                icon: 'Folder',
            },
            {
                value: '胃',
                label: '胃',
                icon: 'Folder',
            },
            {
                value: '骨髓',
                label: '骨髓',
                icon: 'Folder',
            },
            {
                value: '肠',
                label: '肠',
                icon: 'Folder',
            },
            {
                value: '肿瘤',
                label: '肿瘤',
                icon: 'Folder',
            },
            {
                value: '甲状腺',
                label: '甲状腺',
                icon: 'Folder',
            },
            {
                value: '其他',
                label: '其他',
                icon: 'Folder',
            },
        ]
    },
    {
        label: '脑脊液',
        icon: 'Folder',
    },
    {
        label: '尿液',
        icon: 'Folder',
    },
    {
        label: '粪便',
        icon: 'Folder',
    },
];
const hospital = ['浙江大学医学院附属第一医院', '浙江大学医学院附属第四医院', '台州医院', '浙江大学医学院附属儿童医院'];
const content = ['细胞', '全血', '胆汁', '分泌物', 'DNA', 'RNA'];
const pred = ['是', '否'];

const tableheaders = [
    {
        prop: '样本源编号',
        label: '样本源编号',
        width: 240,
    },
    {
        prop: '采集医院',
        label: '采集医院',
        width: 240,
    },
    {
        prop: '样本源类型',
        label: '样本源类型',
        width: 100,
    },
    {
        prop: '样本源姓名',
        label: '样本源姓名',
        width: 100,
    },
    {
        prop: '性别',
        label: '性别',
        width: 100,
    },
    {
        prop: '年龄',
        label: '年龄',
        width: 100,
    },
    {
        prop: '样本创建时间',
        label: '样本源创建时间',
    },
];

const col_headers = [
    {
        prop: '样本源编号',
        label: '样本源编号',
        width: 200,
    },
    {
        prop: '样本源姓名',
        label: '样本源姓名',
        width: 90,
    },
    {
        prop: '性别',
        label: '性别',
        width: 70,
    },
    {
        prop: '样本源类型',
        label: '样本源类型',
        width: 90,
    },
    {
        prop: '预处理',
        label: '是否预处理',
        width: 90,
    },
    {
        prop: '样本类型',
        label: '样本类型',
        width: 90,
    },
    {
        prop: '采集医院',
        label: '采集医院',
        width: 210,
    },
];

const detail_headers = [
    {
        label: '样本信息',
        cols: 4,
        icon: '../../../../assets/images/yangben.png',
    },
    {
        label: '采集信息',
        cols: 3,
        icon: '../../../../assets/images/caiji.png',
    },
    {
        label: '运输信息',
        cols: 3,
        icon: '../../../../assets/images/yunshu.png',
    },
    {
        label: '接收信息',
        cols: 2,
        icon: '../../../../assets/images/jieshou.png',
    },
];

const detail_titles = {
    样本信息: ['样本源编号', '样本源姓名', '样本源类型', '性别', '年龄', '知情同意', '样本创建时间'],
    采集信息: ['样本类型', '样本量', '预处理', '采集时间', '采集医院', '采集状态'],
    运输信息: ['运输方', '负责人', '负责人联系方式', '运出时间', '运输状态'],
    接收信息: ['接收人', '接收人联系方式', '接收状态', '接收时间'],
};

const identifyheaders = [
    {
        prop: '采集医院',
        label: '采集医院',
        width: 200,
    },
    {
        prop: '样本类型',
        label: '样本类型',
        width: 100,
    },
    {
        prop: '样本量',
        label: '样本量',
        width: 100,
    },
    {
        prop: '采集时间',
        label: '采集时间',
        width: 95,
    },
    {
        prop: '预处理',
        label: '预处理',
        width: 95,
    },
];
export { sampleType, tableheaders, hospital, content, pred, col_headers, detail_headers, detail_titles, identifyheaders };
