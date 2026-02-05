<template>
    <view v-if="!loading">
        <button v-if="isMobileBound" @tap="handleLogin">登录</button>
        <button v-else open-type="getPhoneNumber" @getphonenumber="handleLoginWithoutMobile">授权登录</button>
    </view>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { isMobileBoundApi, bindMobileApi } from '@/api/user'
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const userStore = useUserStore()

const loading = ref(true)
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
    isMobileBoundApi().then(res => {
        isMobileBound.value = res.is_mobile_bound
    }).finally(() => {
        loading.value = false
    })
})
</script>