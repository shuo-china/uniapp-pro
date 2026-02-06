import {
  getAccessTokenApi,
  getCurrentUserInfoApi,
  unBindMobileApi,
} from "@/api/user";

import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface UserInfo {
  id: number;
  mobile: string;
}

export const useUserStore = defineStore("user", () => {
  const token = ref<Nullable<string>>(null);
  const userInfo = ref<Nullable<UserInfo>>(null);

  const isLoggedIn = computed(() => userInfo.value !== null);

  function getToken(): Promise<{
    access_token: string;
    is_mobile_bound: boolean;
  }> {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: "weixin",
        success: (res) => {
          if (res.errMsg === "login:ok") {
            getAccessTokenApi({
              code: res.code,
            }).then((res) => {
              token.value = res.access_token;
              resolve(res);
            });
          }
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  async function getUserInfo() {
    const res = await getCurrentUserInfoApi();
    userInfo.value = {
      id: res.id,
      mobile: res.mobile,
    };
    return res;
  }

  async function unBindMobile() {
    await unBindMobileApi();
    userInfo.value = null;
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    getToken,
    getUserInfo,
    unBindMobile,
  };
});
