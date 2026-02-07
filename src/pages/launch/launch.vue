<template>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/user";
import { UserLevel } from "@/utils/enums";

const userStore = useUserStore()

onLoad(async () => {
    uni.showLoading({
        title: "加载中",
        mask: true
    })

    await userStore.getAccessToken()
    if (userStore.userLevel === UserLevel.Bound) {
        await userStore.getUserInfo()
    }

    uni.hideLoading()
    uni.reLaunch({
        url: "/pages/home/home"
    })
})
</script>