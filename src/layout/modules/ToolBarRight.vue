<template>
    <div class="tool-bar-ri">
        <!-- <div class="header-icon">
            <Message />
        </div> -->
        <span class="username">{{ username }}</span>
        <Avatar />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useUserStore } from '@/store';
// import Message from '@/components/Message.vue';
import Avatar from '@/components/Avatar.vue';

const user = useUserStore();
const username = computed(() => user.userInfo);
</script>

<style scoped lang="scss">
.tool-bar-ri {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 25px;
    .header-icon {
        display: flex;
        align-items: center;
        margin-top: 8px;
    }
    .username {
        margin: 0 20px;
        font-size: 15px;
        color: var(--el-header-text-color);
    }
}
</style>
