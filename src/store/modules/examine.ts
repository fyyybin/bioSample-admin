import { defineStore } from 'pinia';

const useExamineStore = defineStore('examine', {
    state: () => ({
        examineState: [],
        adminDialog: false,
        userDialog: false,
        inProcess: 0,
        approved: 0,
        notApproved: 0,
    }),
    actions: {
        setExamine(data) {
            this.examineState = data;
        },
        getApproved() {
            for (const item of this.examineState) {
                if (item.入库状态 === '审核中') {
                    this.inProcess += 1;
                } else if (item.入库状态 === '已入库' || item.入库状态 === '已转移' || item.入库状态 === '已出库' || item.入库状态 === '已废弃') {
                    this.approved += 1;
                } else {
                    this.notApproved += 1;
                }
            }
        },
        clearApproved() {
            this.inProcess = 0;
            this.approved = 0;
            this.notApproved = 0;
        },
    },
});

export default useExamineStore;
