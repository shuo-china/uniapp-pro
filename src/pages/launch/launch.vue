<template>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/user";
import { isMobileBoundApi } from '@/api/user'
import { IS_LOGGED_IN } from "@/utils/constants";

const userStore = useUserStore()

onLoad(async () => {
    uni.showLoading({
        title: "加载中",
        mask: true
    })

    await userStore.getAccessToken()
    if (uni.getStorageSync(IS_LOGGED_IN)) {
        await userStore.login()
    }

    uni.hideLoading()
    uni.reLaunch({
        url: "/pages/index/index"
    })
})
</script>