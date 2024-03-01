<template>
    <div class="tool-bar-lf">
        <el-icon class="collapse-icon" @click="changeCollapse">
            <component :is="collapse.isCollapse ? 'expand' : 'fold'"></component>
        </el-icon>
        <div class="breadcrumb-box mask-image">
            <el-breadcrumb :separator-icon="ArrowRight">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
                        <div class="el-breadcrumb__inner is-link" @click="onBreadcrumbClick(item, index)">
                            <el-icon v-show="item.meta.icon" class="breadcrumb-icon">
                                <component :is="item.meta.icon"></component>
                            </el-icon>
                            <span class="breadcrumb-title">{{ item.meta.title }}</span>
                        </div>
                    </el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';
import { useBreadCrumb, useCollapseStore } from '@/store';
const breadcrumb = useBreadCrumb();
const collapse = useCollapseStore();
const route = useRoute();
const router = useRouter();

const changeCollapse = () => {
    collapse.changeCollapse;
};

const breadcrumbList = computed(() => {
    let breadcrumbData = breadcrumb.breadcrumbListGet([route.matched[route.matched.length - 1].path] ?? []);
    // 🙅‍♀️不需要首页面包屑可删除以下判断
    if (breadcrumbData[0].path !== '/') {
        breadcrumbData = [{ path: '/', meta: { icon: 'HomeFilled', title: '首页' } }, ...breadcrumbData];
    }
    return breadcrumbData;
});

// Click Breadcrumb
const onBreadcrumbClick = (item, index: number) => {
    if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="scss">
.tool-bar-lf {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
}
.collapse-icon {
    margin-right: 20px;
    font-size: 22px;
    color: #303133;
    cursor: pointer;
}
.breadcrumb-box {
    display: flex;
    align-items: center;
    overflow: hidden;
    .el-breadcrumb {
        white-space: nowrap;
        .el-breadcrumb__item {
            position: relative;
            display: inline-block;
            float: none;
            .el-breadcrumb__inner {
                display: inline-flex;
                &.is-link {
                    color: #303133;
                    &:hover {
                        color: var(--el-color-primary);
                    }
                }
                .breadcrumb-icon {
                    margin-top: 2px;
                    margin-right: 6px;
                    font-size: 16px;
                }
                .breadcrumb-title {
                    margin-top: 3px;
                }
            }
            &:last-child .el-breadcrumb__inner,
            &:last-child .el-breadcrumb__inner:hover {
                color: #606266;
            }
            :deep(.el-breadcrumb__separator) {
                position: relative;
                top: -1px;
            }
        }
    }
}
/* mask image */
.mask-image {
    padding-right: 50px;
    mask-image: linear-gradient(90deg, #000000 0%, #000000 calc(100% - 50px), transparent);
}
</style>
