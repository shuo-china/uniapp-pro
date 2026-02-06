<template>
  {{ userStore?.userInfo }}
  <view v-if="!userStore.isLoggedIn" @click="toLogin">
    去登录
  </view>
  <view v-else @click="userStore.unBindMobile()">
    解绑授权
  </view>

</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const toLogin = () => {
  uni.navigateTo({
    url: "/pages/login/login"
  })
}
</script>
