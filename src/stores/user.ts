import { getAccessTokenApi, getCurrentUserInfoApi } from "@/api/user";
import { IS_LOGGED_IN } from "@/utils/constants";
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

  const getAccessToken = () => {
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
  };

  const login = async () => {
    const { id, mobile } = await getCurrentUserInfoApi();
    if (mobile) {
      userInfo.value = { id, mobile };
      uni.setStorageSync(IS_LOGGED_IN, true);
    } else {
      userInfo.value = null;
      uni.removeStorageSync(IS_LOGGED_IN);
    }
  };

  const logout = () => {
    userInfo.value = null;
    uni.removeStorageSync(IS_LOGGED_IN);
  };

  return {
    token,
    userInfo,
    isLoggedIn,
    getAccessToken,
    login,
    logout,
  };
});
