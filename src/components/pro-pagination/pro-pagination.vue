<template>
    <slot :data="data"></slot>
    <view v-if="data?.length" class="pagination-wrapper">
        <uni-pagination v-model="currentPage" :total="total" :page-size="pageSize" />
    </view>
</template>

<script setup lang="ts">
import usePagination, { PaginationOptions } from '@/hooks/usePagination';
import { Service } from '@/hooks/useRequest/type';

const props = withDefaults(defineProps<{
    request: Service<any, any>
    requestOptions?: PaginationOptions;
}>(), {
    requestOptions: () => ({}),
})

const { data, total, currentPage, pageSize, search, reset } =
    usePagination(props.request, props.requestOptions);

const _expose = {
    search,
    reset,
};

defineExpose(_expose);
</script>

<style lang="scss" scoped>
.pagination-wrapper {
    padding: 12px;
}
</style>