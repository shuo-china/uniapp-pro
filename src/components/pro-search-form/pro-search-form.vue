<template>
    <uni-popup ref="popupRef" @change="handleChange">
        <view class="popup-wrapper">
            <slot></slot>
            <view class="btn-wrapper">
                <button @tap="handleReset">重置</button>
                <button type="primary" @tap="handleSearch">查询</button>
            </view>
        </view>
    </uni-popup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(["search", "reset"]);

const visible = defineModel('visible', { type: Boolean, default: false })
let currentShow = visible.value

const popupRef = ref()

const handleChange = ({ show }) => {
    currentShow = show
    visible.value = show
}

const handleReset = () => {
    visible.value = false
    emit('reset')
}

const handleSearch = () => {
    visible.value = false
    emit('search')
}

watch(visible, (newVal) => {
    if (newVal === currentShow) {
        return
    }
    if (newVal) {
        popupRef.value.open('bottom')
    } else {
        popupRef.value.close()
    }
})
</script>

<style lang="scss" scoped>
.popup-wrapper {
    padding: 24px 18px;
    background-color: #fff;

    .btn-wrapper {
        display: flex;
        justify-content: space-around;
        column-gap: 18px;

        button {
            flex: 1;
            font-size: 16px;
            height: 40px;
            line-height: 40px;
        }
    }
}
</style>