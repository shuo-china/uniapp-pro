import {
  bindMobileApi,
  getAccessTokenApi,
  getCurrentUserInfoApi,
  unBindMobileApi,
} from "@/api/user";
import { UserLevel } from "@/utils/enums";

import { defineStore } from "pinia";
import { ref } from "vue";

interface UserInfo {
  id: number;
  mobile: string;
}

export const useUserStore = defineStore("user", () => {
  const token = ref<Nullable<string>>(null);
  const userInfo = ref<Nullable<UserInfo>>(null);
  const userLevel = ref<UserLevel>(UserLevel.Anonymous);

  function getAccessToken() {
    return new Promise((resolve, reject) => {
      uni.login({
        provider: "weixin",
        success: (res) => {
          if (res.errMsg === "login:ok") {
            getAccessTokenApi({
              code: res.code,
            }).then((res) => {
              token.value = res.token_info.access_token;
              userLevel.value = res.level;
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

  async function bindMobile(code: string) {
    await bindMobileApi({
      code,
    });
    await getAccessToken();
    await getUserInfo();
  }

  async function unBindMobile() {
    await unBindMobileApi();
    await getAccessToken();
    userInfo.value = null;
  }

  return {
    token,
    userInfo,
    userLevel,
    getAccessToken,
    getUserInfo,
    bindMobile,
    unBindMobile,
  };
});
