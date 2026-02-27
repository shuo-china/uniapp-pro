<template>
    <pro-upload v-model="fileList" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref([
    {
        key: 'asd',
        path: 'https://pic2.zhimg.com/v2-416700a012d964dbddc14a444369c571_1440w.jpg',
        name: '图片1',
    }
])
</script>