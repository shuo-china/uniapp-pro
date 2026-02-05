import request from "@/utils/request";
import { HttpRequestConfig } from "luch-request";

export function getDictOptionsApi(
  params: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request({
    method: "GET",
    url: "/dict/options",
    params,
    ...options,
  });
}
