<template>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore()

onLoad(async () => {
    uni.showLoading({
        title: "加载中",
        mask: true
    })

    const { is_mobile_bound } = await userStore.getToken()
    if (is_mobile_bound) {
        await userStore.getUserInfo()
    }

    uni.hideLoading()
    uni.reLaunch({
        url: "/pages/home/home"
    })
})
</script>