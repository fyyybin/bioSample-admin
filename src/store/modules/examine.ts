import { defineStore } from 'pinia';

const useExamineStore = defineStore('examine', {
    state: () => ({
        examineState: [],
        adminDialog: false,
        userDialog: false,
    }),
    actions: {
        setExamine(data) {
            this.examineState = data;
        },
    },
});

export default useExamineStore;
