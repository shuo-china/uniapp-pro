import request from "@/utils/request";
import { HttpRequestConfig } from "luch-request";

export function getAccessTokenApi(
  data: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request({
    method: "POST",
    url: "/access/createAccessToken",
    data,
    ...options,
  });
}

export function getCurrentUserInfoApi(options?: HttpRequestConfig) {
  return request({
    url: "/user/currentUser",
    method: "GET",
    ...options,
  });
}

export function bindMobileApi(
  data: Record<string, any>,
  options?: HttpRequestConfig,
) {
  return request({
    method: "POST",
    url: "/user/bindMobile",
    data,
    ...options,
  });
}

export function unBindMobileApi(options?: HttpRequestConfig) {
  return request({
    url: "/user/unBindMobile",
    method: "GET",
    ...options,
  });
}
