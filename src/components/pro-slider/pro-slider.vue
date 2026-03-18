<template>
    <view class="pro-slider">
        <slider class="slider-content" :value="sliderValue" :min="realMin" :max="realMax" :step="step"
            :disabled="disabled" :active-color="activeColor" :background-color="backgroundColor" :block-size="blockSize"
            :block-color="blockColor" :show-value="false" @change="onChange" @changing="onChanging" />
        <view v-if="showValue" class="slider-value">{{ displayValue }}</view>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    modelValue?: number | null;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    activeColor?: string;
    backgroundColor?: string;
    blockSize?: number;
    blockColor?: string;
    showValue?: boolean;
    minUnlimited?: boolean;
    maxUnlimited?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: 0,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    activeColor: '#007aff',
    backgroundColor: '#e9e9e9',
    blockSize: 28,
    blockColor: '#ffffff',
    showValue: false,
    minUnlimited: false,
    maxUnlimited: false,
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
    (e: 'change', event: any): void;
    (e: 'changing', event: any): void;
}>();

const realMin = computed(() => {
    return props.minUnlimited ? props.min - props.step : props.min;
});

const realMax = computed(() => {
    return props.maxUnlimited ? props.max + props.step : props.max;
});

const sliderValue = computed(() => {
    if (props.modelValue === null) {
        if (props.minUnlimited) return realMin.value;
        if (props.maxUnlimited) return realMax.value;
        return props.min;
    }
    return props.modelValue;
});

const displayValue = computed(() => {
    if (props.modelValue === null) {
        return '不限';
    }
    return props.modelValue;
});

const processValue = (value: number) => {
    if (props.minUnlimited && value <= realMin.value) {
        return null;
    }
    if (props.maxUnlimited && value >= realMax.value) {
        return null;
    }
    return value;
};

const onChange = (e: any) => {
    const value = processValue(e.detail.value);
    emit('update:modelValue', value);
    emit('change', { ...e, detail: { ...e.detail, value } });
};

const onChanging = (e: any) => {
    const value = processValue(e.detail.value);
    emit('update:modelValue', value);
    emit('changing', { ...e, detail: { ...e.detail, value } });
};
</script>

<style scoped>
.pro-slider {
    display: flex;
    align-items: center;
}

.slider-content {
    flex: 1;
    margin: 0 18px;
}

.slider-value {
    font-size: 14px;
    color: #888;
    width: 4ch;
}
</style>
