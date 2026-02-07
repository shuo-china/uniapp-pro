<template>

  <button v-if="userStore.userLevel !== UserLevel.Bound" @click="toLogin">
    去登录
  </button>
  <view v-if="userStore.userLevel === UserLevel.Bound">
    {{ userStore.userInfo }}
    <button @click="unBindMobile">
      解绑授权
    </button>
  </view>

</template>

<script setup lang="ts">
import { unBindMobileApi } from '@/api/user';
import { useUserStore } from '@/stores/user';
import { UserLevel } from '@/utils/enums';

const userStore = useUserStore()

const unBindMobile = async () => {
  await userStore.unBindMobile()
  uni.showToast({
    title: "解绑成功",
    icon: "success"
  })
}

const toLogin = () => {
  uni.navigateTo({
    url: "/pages/login/login"
  })
}
</script>
