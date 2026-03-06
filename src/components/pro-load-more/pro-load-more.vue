<template>
    <slot :data="data"></slot>
    <view class="load-more">
        <uni-load-more :status="loadMoreStatus"></uni-load-more>
    </view>
</template>

<script setup lang="ts">
import useLoadMore, { LoadMoreOptions } from '@/hooks/useLoadMore';
import { Service } from '@/hooks/useRequest/type';

const props = withDefaults(defineProps<{
    request: Service<any, any>
    requestOptions?: LoadMoreOptions;
}>(), {
    requestOptions: () => ({}),
})

const { data, loadMoreStatus, search, reset } =
    useLoadMore(props.request, props.requestOptions);

const _expose = {
    search,
    reset,
};

defineExpose(_expose);
</script>

<style lang="scss" scoped>
.load-more {
    padding: 8px 0;
}
</style>