<template>
    <view class="container">
        <button v-if="isMobileBound" class="login-btn" @tap="handleLogin">登录</button>
        <button v-else class="login-btn" open-type="getPhoneNumber"
            @getphonenumber="handleLoginWithoutMobile">授权登录</button>
    </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { isMobileBoundApi, bindMobileApi } from '@/api/user'
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const userStore = useUserStore()

const isMobileBound = ref(false)

const handleLogin = () => {
    userStore.login().then(() => {
        uni.navigateBack()
    })
}

const handleLoginWithoutMobile = (e) => {
    if (e.detail.code) {
        bindMobileApi({
            code: e.detail.code
        }).then(() => {
            return userStore.login()
        }).then(() => {
            uni.navigateBack()
        })
    }
}

onLoad(() => {
    uni.showLoading({
        title: "加载中",
        mask: true
    })
    isMobileBoundApi().then(res => {
        isMobileBound.value = res.is_mobile_bound
    }).finally(() => {
        uni.hideLoading()
    })
})
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