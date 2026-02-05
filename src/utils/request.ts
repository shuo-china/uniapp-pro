import { useUserStore } from "@/stores/user";
import Request, { HttpRequestConfig, HttpRequestTask } from "luch-request";

const http = new Request({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

http.interceptors.request.use(
  (config) => {
    config.header = Object.assign({}, config.header || {}, {
      Accept: "application/json",
    });
    const userStore = useUserStore();
    if (userStore.token) {
      config.header.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (config) => Promise.reject(config),
);

http.interceptors.response.use(
  (response) => response,
  async (response) => {
    uni.showToast({
      title: response.data?.message || response.errMsg,
      icon: "none",
      duration: 2000,
    });
    return Promise.reject(response.data || {});
  },
);

function request<T = any, D = HttpRequestTask>(
  config: HttpRequestConfig<D>,
): Promise<T> {
  return http.request(config).then((res) => res.data);
}

export default request;
