<template>
  {{ userStore?.userInfo }}
  {{ userStore.isLoggedIn }}
  <view @click="toLogin">
    去登录
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
