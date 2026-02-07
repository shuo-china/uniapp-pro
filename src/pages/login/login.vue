<template>
    <view class="container">
        <button class="login-btn" open-type="getPhoneNumber" @getphonenumber="login">授权登录</button>
    </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { bindMobileApi } from '@/api/user'

const userStore = useUserStore()

const login = (e) => {
    if (e.detail.code) {
        userStore.bindMobile(e.detail.code).then(() => {
            uni.navigateBack()
        })
    }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 0 12px;

    .login-btn {
        font-size: 16px;
        padding: 2px 0;
        color: white;
        background-color: #876e49;
        border-radius: 50px;
    }
}
</style>